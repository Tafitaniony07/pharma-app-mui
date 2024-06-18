/* eslint-disable no-unused-vars */
import React, { useState, useContext, useRef } from "react";
import {
	Grid,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	InputAdornment,
	TableFooter,
	TablePagination,
	Fab,
	Select,
	MenuItem,
	Button,
	Stack,
	CircularProgress,
	Paper,
	Typography,
	DialogActions,
	DialogContent,
	DialogTitle,
	Dialog,
	createTheme,
	ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ShoppingCartOutlined, Visibility, Check, Print } from "@mui/icons-material";
import { toast, Toaster } from "sonner";
import { TransactionContext } from "./TransactionContext";
import { useNavigate } from "react-router";
import MedicamentTable from "../../components/MedicamentTable.jsx";
import Panier from "../../components/Panier.jsx";
import TransactionDialog from "../../components/TransitionDialog.jsx";
import { useReactToPrint } from "react-to-print";
// import Invoice from "../../components/print";

const ListMedicamentsVendeur = () => {
	const { transactions, setTransactions } = useContext(TransactionContext);
	const [filterText, setFilterText] = useState("");
	const [sortColumn, setSortColumn] = useState("name");
	const [sortDirection, setSortDirection] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [addCart, setAddCart] = useState([]);
	const [loadingState, setLoadingState] = useState({});
	const [units, setUnits] = useState({});
	const [quantities, setQuantities] = useState({});
	const [clientName, setClientName] = useState(""); // Champ pour le nom du client
	const [paymentStatus, setPaymentStatus] = useState("Payé");
	const [remainingAmount, setRemainingAmount] = useState(0);
	const [dialogOpen, setDialogOpen] = useState(false);

	// Sample medications data
	const Medicaments = [
		{ name: "AAMLA gelu /30", price: 1500, unitPrice: 500 },
		{ name: "ABBOTICINE gnl/sp", price: 15200, unitPrice: 3800 },
		{ name: "Paracetamol", price: 1800, unitPrice: 600 },
		{ name: "Parabufen", price: 2800, unitPrice: 700 },
		{ name: "ABUFENE 400mg cpr /30", price: 18800, unitPrice: 4700 },
	];

	// Filter and sort the medications
	const filteredData = Medicaments.filter((item) => item.name.toLowerCase().includes(filterText.toLowerCase()));
	const sortedData = filteredData.sort((a, b) => {
		if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
		if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

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

	const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	// Add item to cart
	const addToCart = (item) => {
		const unit = units[item.name] || "plaquette";
		const quantity = quantities[item.name] || 1;
		let itemPrice = unit === "boîte" ? item.price : item.unitPrice;
		if (unit === "boîte" && quantity > 4) {
			itemPrice = itemPrice * 0.95; // Apply 5% discount
		}
		const cartItem = { ...item, price: itemPrice * quantity, unit, quantity };
		if (addCart.some((cartItem) => cartItem.name === item.name && cartItem.unit === unit)) {
			toast.warning("L'article est déjà ajouté au panier");
			return;
		}
		setLoadingState({ ...loadingState, [item.name]: true });
		setTimeout(() => {
			setAddCart((prev) => [...prev, cartItem]);
			setLoadingState({ ...loadingState, [item.name]: false });
		}, 500);
	};

	const navigate = useNavigate();

	// Update cart quantity
	const updateCartQuantity = (name, quantity) => {
		setAddCart((prevCart) =>
			prevCart.map((item) =>
				item.name === name
					? {
							...item,
							quantity,
							price: item.unit === "boîte" ? item.price * quantity : item.unitPrice * quantity,
					  }
					: item
			)
		);
	};

	// Save transaction
	const saveTransaction = () => {
		const totalAmount = calculateTotalPrice();
		const newTransaction = {
			date: new Date(),
			clientName,
			paymentStatus,
			remainingAmount,
			totalPaid: paymentStatus === "Payé" ? totalAmount : totalAmount - remainingAmount,
			items: [...addCart],
		};
		setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
		setAddCart([]);
		setClientName("");
		setPaymentStatus("Payé");
		setRemainingAmount(0);
		setDialogOpen(true); // Ouvrir la boîte de dialogue après enregistrement de la transaction
	};

	// Print invoice
	// const invoiceRef = useRef();

	// const handlePrint = useReactToPrint({
	// 	content: () => invoiceRef.current,
	// });

	// const printInvoice = () => {
	// 	handlePrint();
	// };
	// Calculate total price
	const calculateTotalPrice = () => {
		return addCart.reduce((total, item) => total + item.price, 0);
	};

	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<TextField
						label="Filtrer par nom"
						value={filterText}
						color="success"
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
				</Grid>
				<Grid item xs={7}>
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
						Medicaments={Medicaments}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Grid>
				<Grid item xs={5}>
					<Panier
						addCart={addCart}
						clientName={clientName}
						paymentStatus={paymentStatus}
						remainingAmount={remainingAmount}
						updateCartQuantity={updateCartQuantity}
						calculateTotalPrice={calculateTotalPrice}
						setClientName={setClientName}
						setPaymentStatus={setPaymentStatus}
						setRemainingAmount={setRemainingAmount}
						saveTransaction={saveTransaction}
						// printInvoice={printInvoice}
					/>
				</Grid>
			</Grid>

			<TransactionDialog
				dialogOpen={dialogOpen}
				setDialogOpen={setDialogOpen}
				navigate={navigate}
				// printInvoice={printInvoice}
			/>
			{/* <div style={{ display: "block" }}>
				<Invoice
					// ref={invoiceRef}
					clientName={clientName}
					paymentStatus={paymentStatus}
					remainingAmount={remainingAmount}
					cartItems={addCart}
				/>
			</div> */}
		</>
	);
};

export default ListMedicamentsVendeur;
