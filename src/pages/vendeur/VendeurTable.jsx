/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-catch */
import { useState, useContext, useEffect } from "react";
import { TextField, InputAdornment, Stack, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Toaster, toast } from "sonner";
import { TransactionContext } from "./TransactionContext.jsx";
import { useNavigate } from "react-router";
import MedicamentTable from "./MedicamentTable.jsx";
import Panier from "./Panier.jsx";
import { stock } from "../../api/product.js";
import { SellProduct } from "../../api/product.js";
import AchatDialog from "../../components/dialog/achatDialog.jsx";

const ListMedicamentsVendeur = () => {
	const navigate = useNavigate();
	const { transactions, setTransactions } = useContext(TransactionContext);
	const [filterText, setFilterText] = useState("");
	const [addCart, setAddCart] = useState([]);
	const [loadingState, setLoadingState] = useState({});
	const [quantities, setQuantities] = useState({});
	const [clientName, setClientName] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("Payé");
	const [remainingAmount, setRemainingAmount] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [medic, setMedic] = useState([]);
	const [currentTransaction, setCurrentTransaction] = useState(null);
	const [loading, setLoading] = useState(true); // État de chargement

	useEffect(() => {
		const fetch = async () => {
			const res = await stock();
			setLoading(false); // Fin du chargement
			setMedic(() =>
				res.data.filter((item) =>
					item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())
				)
			);
		};
		fetch();
	}, [filterText]);

	const addToCart = (item) => {
		const detailQty = quantities[item.detail_product.designation]?.detail || 0;
		const grosQty = quantities[item.detail_product.designation]?.gros || 0;
		const quantityDetails = detailQty > 0 ? detailQty : 0;
		const quantityBulk = grosQty > 0 ? grosQty : 0;
		const itemPriceDetails = item.prix_uniter * quantityDetails;
		const itemPriceBulk = item.prix_gros * quantityBulk;
		const totalItemPrice = itemPriceDetails + itemPriceBulk;

		const cartItem = {
			...item,
			price: totalItemPrice,
			quantityDetails: quantityDetails,
			quantityBulk: quantityBulk,
		};

		if (addCart.some((cartItem) => cartItem.pk === item.pk)) {
			toast.warning("L'article est déjà ajouté au panier");
			return;
		}
		setLoadingState({ ...loadingState, [item.pk]: true });
		setTimeout(() => {
			setAddCart((prev) => [...prev, cartItem]);
			setLoadingState({ ...loadingState, [item.detail_product.designation]: false });
		}, 200);
	};
	// Update cart quantity
	const updateCartQuantity = (pk, type, quantity) => {
		setAddCart((prevCart) =>
			prevCart.map((item) => {
				if (item.pk === pk) {
					let newQuantityDetails = item.quantityDetails;
					let newQuantityBulk = item.quantityBulk;

					if (type === "details") {
						newQuantityDetails = quantity;
					} else if (type === "bulk") {
						newQuantityBulk = quantity;
					}
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
	// Save transaction
	const saveTransaction = async () => {
		const totalAmount = calculateTotalPrice();
		const newTransaction = {
			date: new Date(),
			clientName,
			paymentStatus,
			remainingAmount,
			totalPaid: paymentStatus === "Payé" ? totalAmount : totalAmount - remainingAmount,
			items: [...addCart],
		};
		try {
			const datas = newTransaction.items.map((item) => {
				return {
					product_id: item.pk,
					qte_uniter_transaction: item.quantityDetails,
					qte_gros_transaction: item.quantityBulk,
				};
			});
			datas.push({ prix_restant: newTransaction.remainingAmount });
			datas.push({ client: newTransaction.clientName });
			const res = await SellProduct(datas);
			setCurrentTransaction(res.data);
		} catch (error) {
			throw error;
		}

		setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
		setAddCart([]);
		setClientName("");
		setPaymentStatus("Payé");
		setRemainingAmount(0);
		setDialogOpen(true); // Ouvrir la boîte de dialogue après enregistrement de la transaction
	};

	const calculateTotalPrice = () => {
		return addCart.reduce((total, item) => total + item.price, 0);
	};

	return (
		<>
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" maxWidth="100%">
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={5}>
					<TextField
						label="Filtrer par nom"
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
						Medicaments={medic}
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