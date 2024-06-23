import { useState, useContext } from "react";
import { Grid, TextField, InputAdornment, Stack, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "sonner";
import { TransactionContext } from "./TransactionContext.jsx";
import { useNavigate } from "react-router";
import MedicamentTable from "../../components/MedicamentTable.jsx";
import Panier from "../../components/Panier.jsx";
import TransactionDialog from "../../components/TransitionDialog.jsx";

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
		{ name: "AAMLA gelu /30", priceGros: 1500, unitPrice: 500 },
		{ name: "ABBOTICINE gnl/sp", priceGros: 15200, unitPrice: 3800 },
		{ name: "Paracetamol", priceGros: 1800, unitPrice: 600 },
		{ name: "Parabufen", priceGros: 2800, unitPrice: 700 },
		{ name: "ABUFENE 400mg cpr /30", priceGros: 18800, unitPrice: 4700 },
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

	const calculateTotalPrice = () => {
		return addCart.reduce((total, item) => total + item.price, 0);
	};

	return (
		<>
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" maxWidth="100%">
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={4}>
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
						Medicaments={Medicaments}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Box>
				<Box bgcolor="secondary.main" borderRadius={5} p={2} mr={3} flex={1}>
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
					/>
				</Box>
			</Stack>

			<TransactionDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} navigate={navigate} />
		</>
	);
};

export default ListMedicamentsVendeur;
