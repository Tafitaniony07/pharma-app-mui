import { isWithinInterval, startOfDay, startOfWeek } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useAccountStore } from "../accountStore";
import { listAccount } from "../api/account";
import { ListFacture } from "../api/facture";

export const VendeurData = () => {
	// État pour stocker la liste des factures
	const [listFactures, setListTransaction] = useState([]);
	// État pour stocker la liste des vendeurs
	const [listVendeur, setListVendeur] = useState([]);
	// Récupération du compte utilisateur depuis le store
	const { account } = useAccountStore();

	// Hook d'effet pour charger les données initiales
	useEffect(() => {
		// Fonction pour récupérer toutes les factures
		const fetchTransactions = async () => {
			const res = await ListFacture();
			setListTransaction(res.data);
		};

		// Fonction pour récupérer la liste des vendeurs
		const fetchVendeurs = async () => {
			const res = await listAccount();
			if (res.status === 200) {
				// Filtrer pour ne garder que les comptes de type vendeur
				setListVendeur(() => res.data.filter((item) => item.account_type === "vendeur"));
			}
		};
		// Appel pour charger les factures
		fetchTransactions();

		// Si l'utilisateur est un vendeur, on ne charge que ses données
		if (account.account_type === "vendeurs") {
			setListVendeur([{ ...account, account_type: "vendeur" }]);
		} else {
			// Sinon on charge tous les vendeurs
			fetchVendeurs();
		}
	}, [account]);

	// Fonction pour calculer le total des ventes sur une période donnée pour un vendeur
	const getTotalByPeriod = (periodStart, vendeur) => {
		const now = new Date();

		return (
			listFactures
				// Filtrer les factures par vendeur
				.filter((facture) => facture.owner === vendeur.username)
				// Transformer la liste des factures en liste de produits
				.flatMap((item) => item.produits)
				// Filtrer les produits par période
				.filter((product) => {
					const transactionDate = new Date(product.date);
					return isWithinInterval(transactionDate, {
						start: periodStart,
						end: now,
					});
				})
				// Calculer la somme totale des prix
				.reduce((sum, product) => sum + Number(product.prix_total), 0)
		);
	};

	// Fonction mémorisée pour obtenir les totaux par période pour chaque vendeur
	const getListPeriodTotal = useCallback(() => {
		return listVendeur.map((vendeur) => {
			return {
				// Créer un objet avec les totaux par période
				vendeur: vendeur.username,
				day: getTotalByPeriod(startOfDay(new Date()), vendeur),
				week: getTotalByPeriod(startOfWeek(new Date()), vendeur),
				month: getTotalByPeriod(startOfWeek(new Date()), vendeur),
			};
		});
	}, [listVendeur, listFactures]);

	// Calcul des résumés des transactions
	const listSummary = getListPeriodTotal();
};
