import { isThisMonth, isThisWeek, isToday } from "date-fns";
import { useEffect, useState } from "react";

const useTransactionFilter = (listTransactions) => {
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [anchorElFilter, setAnchorElFilter] = useState("");
	const [selectedVendeur, setSelectedVendeur] = useState({});

	// Fonction pour appliquer les filtres et mettre à jour les transactions filtrées
	const applyFilters = () => {
		const vendeursActifs = Object.keys(selectedVendeur).filter((username) => selectedVendeur[username]);

		// Filtrage des transactions basé sur la recherche et les filtres
		const newFilteredTransactions = listTransactions.filter((transaction) => {
			const matchesClient = transaction.client.toLowerCase().includes(searchText.toLowerCase());
			const matchesVendeur = vendeursActifs.length === 0 || vendeursActifs.includes(transaction.owner);
			const matchesPayment =
				anchorElFilter === "paye"
					? parseInt(transaction.prix_restant) === 0
					: anchorElFilter === "nonPaye"
					? parseInt(transaction.prix_restant) > 0
					: true;
			const matchesDate =
				anchorElFilter === "today"
					? transaction.produits.some((p) => isToday(new Date(p.date)))
					: anchorElFilter === "thisWeek"
					? transaction.produits.some((p) => isThisWeek(new Date(p.date)))
					: anchorElFilter === "thisMonth"
					? transaction.produits.some((p) => isThisMonth(new Date(p.date)))
					: true;

			return matchesClient && matchesVendeur && matchesPayment && matchesDate;
		});

		// Mise à jour de filteredTransactions
		setFilteredTransactions(newFilteredTransactions);

		// Mettre à jour les vendeurs sélectionnés en fonction des résultats
		const vendeursAvecClients = {};

		newFilteredTransactions.forEach((transaction) => {
			if (transaction.client.toLowerCase().includes(searchText.toLowerCase())) {
				vendeursAvecClients[transaction.owner] = true; // Si un client correspond, activer le vendeur
			}
		});

		// Mettre à jour l'état de selectedVendeur uniquement avec les vendeurs ayant des résultats
		setSelectedVendeur((prevSelectedVendeur) => {
			const updatedVendeur = { ...prevSelectedVendeur };
			Object.keys(updatedVendeur).forEach((vendeur) => {
				// Désactiver le vendeur s'il n'a pas de résultats
				if (!vendeursAvecClients[vendeur]) {
					updatedVendeur[vendeur] = false;
				}
			});
			return {
				...updatedVendeur,
				...vendeursAvecClients, // Ajouter ou maintenir les vendeurs avec des résultats
			};
		});
	};

	// Fonction pour réinitialiser les vendeurs sélectionnés
	const resetVendeurSelection = () => {
		setSelectedVendeur({});
	};

	// Effet secondaire : appliquer les filtres et réinitialiser les vendeurs quand searchText change
	useEffect(() => {
		if (searchText === "") {
			resetVendeurSelection();
			applyFilters();
		} else {
			applyFilters();
		}
	}, [searchText, listTransactions, anchorElFilter, selectedVendeur]);

	return {
		setFilteredTransactions,
		filteredTransactions,
		searchText,
		setSearchText,
		selectedVendeur,
		setSelectedVendeur,
		anchorElFilter,
		setAnchorElFilter,
		applyFilters,
	};
};

export default useTransactionFilter;
