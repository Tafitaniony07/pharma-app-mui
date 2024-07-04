/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
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
	const { transactions, setTransactions } = useContext(TransactionContext);
	const [filterText, setFilterText] = useState("");
	const [sortColumn, setSortColumn] = useState("name");
	const [sortDirection, setSortDirection] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [addCart, setAddCart] = useState([]);
	const [loadingState, setLoadingState] = useState({});
	const [units, setUnits] = useState({});
	const [quantities, setQuantities] = useState({});
	const [clientName, setClientName] = useState(""); // Champ pour le nom du client
	const [paymentStatus, setPaymentStatus] = useState("Payé");
	const [remainingAmount, setRemainingAmount] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [medic, setMedic] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [sortedData, setSortData] = useState([]);
	const [paginatedData, setpaginatedData] = useState([]);
	// Sample medications data

	useEffect(() => {
		const fetch = async () => {
			const res = await stock();
			setMedic(() =>
				res.data.filter((item) =>
					item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())
				)
			);
		};
		fetch();
	}, []);

	useEffect(() => {
		setFilteredData(
			medic.filter((item) => item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase()))
		);
	}, [medic]);

	useEffect(() => {
		setSortData(() => {
			return filteredData.sort((a, b) => {
				if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
				if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
				return 0;
			});
		});
	}, [filteredData]);
	// const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	useEffect(() => {
		setpaginatedData(sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage));
	}, [sortedData]);

	// Filter and sort the medications
	// const filteredData = medic.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()));
	// const sortedData = filteredData.sort((a, b) => {
	// 	if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
	// 	if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
	// 	return 0;
	// });

	// Handle sorting
	const handleSort = (column) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	// Handle pagination
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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
		}, 500);
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
	const navigate = useNavigate();

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
						filterText={filterText}
						setFilterText={setFilterText}
						sortColumn={sortColumn}
						sortDirection={sortDirection}
						handleSort={handleSort}
						paginatedData={paginatedData}
						loadingState={loadingState}
						addCart={addCart}
						units={units}
						quantities={quantities}
						setUnits={setUnits}
						setQuantities={setQuantities}
						addToCart={addToCart}
						page={page}
						rowsPerPage={rowsPerPage}
						Medicaments={medic}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
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
			<Toaster position="top-center" richColors />

			<AchatDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} navigate={navigate} />
		</>
	);
};

export default ListMedicamentsVendeur;
