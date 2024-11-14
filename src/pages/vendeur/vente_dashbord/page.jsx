/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { Toaster, toast } from "sonner";
import { SellProduct, stock } from "../../../api/product.js";
import AchatDialog from "../../../components/modal/achatDialog.jsx";
import Panier from "../panier/page.jsx";
import MedicamentTable from "../table_product/page.jsx";
import { TransactionContext } from "../transaction_context/page.jsx";

const ListMedicamentsVendeur = () => {
	// Hook de navigation React Router
	const navigate = useNavigate();

	// Context pour gérer les transactions
	const { transactions, setTransactions } = useContext(TransactionContext);

	// États pour gérer le filtrage et la recherche
	const [filterText, setFilterText] = useState("");

	// États pour gérer le panier
	const [addCart, setAddCart] = useState([]); // Liste des articles dans le panier
	const [loadingState, setLoadingState] = useState({}); // État de chargement par article
	const [quantities, setQuantities] = useState({}); // Quantités par article (détail et gros)

	// États pour les informations de transaction
	const [clientName, setClientName] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("Payé");
	const [remainingAmount, setRemainingAmount] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);

	// États pour les médicaments
	const [medic, setMedic] = useState([]);
	const [currentTransaction, setCurrentTransaction] = useState(null);
	const [loading, setLoading] = useState(true);

	// Récupération initiale des données
	useEffect(() => {
		const fetch = async () => {
			const res = await stock(); // Appelez la fonction stock pour obtenir les données
			setMedic(res.data); // Stocke les données du stock dans medic
			setLoading(false); // Mettre à jour l'état de chargement
		};
		fetch();
	}, []);

	// Filtrage des données localement avec useMemo
	const filteredMedic = useMemo(
		() => medic.filter((item) => item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())),
		[filterText, medic]
	);

	/**
	 * Ajoute un article au panier avec calcul complexe des prix
	 * @param {Object} item - L'article à ajouter
	 */
	const addToCart = (item) => {
		// Récupère les quantités détail et gros depuis l'état quantities
		const detailQty = quantities[item.detail_product.designation]?.detail || 0;
		const grosQty = quantities[item.detail_product.designation]?.gros || 0;

		// Vérifie et normalise les quantités
		const quantityDetails = detailQty > 0 ? detailQty : 0;
		const quantityBulk = grosQty > 0 ? grosQty : 0;

		// Calcule les prix pour chaque type de vente
		const itemPriceDetails = item.prix_uniter * quantityDetails;
		const itemPriceBulk = item.prix_gros * quantityBulk;
		const totalItemPrice = itemPriceDetails + itemPriceBulk;

		// Crée l'objet à ajouter au panier
		const cartItem = {
			...item,
			price: totalItemPrice,
			quantityDetails: quantityDetails,
			quantityBulk: quantityBulk,
		};

		// Vérifie si l'article existe déjà
		if (addCart.some((cartItem) => cartItem.pk === item.pk)) {
			toast.warning("L'article est déjà ajouté au panier");
			return;
		}

		// Animation de chargement et ajout différé
		setLoadingState({ ...loadingState, [item.pk]: true });
		setTimeout(() => {
			setAddCart((prev) => [...prev, cartItem]);
			setLoadingState({ ...loadingState, [item.detail_product.designation]: false });
		}, 200);
	};

	/**
	 * Met à jour la quantité d'un article dans le panier avec recalcul des prix
	 * @param {number} pk - Identifiant du produit
	 * @param {string} type - Type de quantité ('details' ou 'bulk')
	 * @param {number} quantity - Nouvelle quantité
	 */
	const updateCartQuantity = (pk, type, quantity) => {
		setAddCart((prevCart) =>
			prevCart.map((item) => {
				if (item.pk === pk) {
					// Garde les quantités actuelles
					let newQuantityDetails = item.quantityDetails;
					let newQuantityBulk = item.quantityBulk;

					// Met à jour la quantité appropriée
					if (type === "details") {
						newQuantityDetails = quantity;
					} else if (type === "bulk") {
						newQuantityBulk = quantity;
					}

					// Recalcule les prix avec les nouvelles quantités
					const newPriceDetails = parseInt(item.prix_uniter) * newQuantityDetails;
					const newPriceBulk = parseInt(item.prix_gros) * newQuantityBulk;
					const newTotalPrice = newPriceDetails + newPriceBulk;

					return {
						...item,
						quantityDetails: newQuantityDetails,
						quantityBulk: newQuantityBulk,
						price: newTotalPrice,
					};
				}
				return item;
			})
		);
	};

	const removeFromCart = (pk) => {
		setAddCart((prevCart) => prevCart.filter((item) => item.pk !== pk));
		toast.warning("L'article a été retiré du panier");
	};

	const clearCart = () => {
		setAddCart([]);
	};

	/**
	 * Sauvegarde la transaction avec gestion du paiement partiel
	 * Envoie les données à l'API et met à jour le state local
	 */
	const saveTransaction = async () => {
		const totalAmount = calculateTotalPrice();
		// Crée l'objet transaction avec gestion du paiement partiel
		const newTransaction = {
			date: new Date(),
			clientName,
			paymentStatus,
			remainingAmount,
			totalPaid: paymentStatus === "Payé" ? totalAmount : totalAmount - remainingAmount,
			items: [...addCart],
		};

		try {
			// Formate les données pour l'API
			const datas = newTransaction.items.map((item) => ({
				product_id: item.pk,
				qte_uniter_transaction: item.quantityDetails,
				qte_gros_transaction: item.quantityBulk,
			}));

			// Ajoute les informations de paiement et client
			datas.push({ prix_restant: newTransaction.remainingAmount });
			datas.push({ client: newTransaction.clientName });

			const res = await SellProduct(datas);
			setCurrentTransaction(res.data);
		} catch (error) {
			throw error;
		}

		// Réinitialise tous les états après la sauvegarde
		setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
		setAddCart([]);
		setClientName("");
		setPaymentStatus("Payé");
		setRemainingAmount(0);
		setDialogOpen(true);
	};

	// Calcule le total du panier en sommant les prix de chaque article
	const calculateTotalPrice = () => {
		return addCart.reduce((total, item) => total + item.price, 0);
	};

	return (
		<>
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" maxWidth="100%">
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={5}>
					<TextField
						label="Rechercher un médicament..."
						placeholder="Entrez le nom du médicament"
						value={filterText}
						color="success"
						sx={{ mb: 3 }}
						onChange={(e) => setFilterText(e.target.value)}
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
					<MedicamentTable
						loadingState={loadingState}
						addToCart={addToCart}
						Medicaments={filteredMedic}
						loading={loading}
					/>
				</Box>
				<Box
					sx={{
						borderRadius: 5,
						p: 2,
						mr: 3,
						bgcolor: "#fff",
					}}
					flex={3}
				>
					<Panier
						addCart={addCart}
						clearCart={clearCart}
						removeFromCart={removeFromCart}
						clientName={clientName}
						paymentStatus={paymentStatus}
						remainingAmount={remainingAmount}
						updateCartQuantity={updateCartQuantity}
						calculateTotalPrice={calculateTotalPrice}
						setClientName={setClientName}
						setPaymentStatus={setPaymentStatus}
						setRemainingAmount={setRemainingAmount}
						saveTransaction={saveTransaction}
					/>
				</Box>
			</Stack>
			<AchatDialog
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				navigate={navigate}
				transaction={currentTransaction}
			/>
			<Toaster position="top-center" richColors />
		</>
	);
};

export default ListMedicamentsVendeur;
