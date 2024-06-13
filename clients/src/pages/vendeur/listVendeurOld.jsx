/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
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
		{ name: "AAMLA gelu /30", quantity: 50, price: 1500, unitPrice: 500 },
		{ name: "ABBOTICINE gnl/sp", quantity: 150, price: 15200, unitPrice: 3800 },
		{ name: "Paracetamol", quantity: 50, price: 1800, unitPrice: 600 },
		{ name: "Parabufen", quantity: 150, price: 2800, unitPrice: 700 },
		{ name: "ABUFENE 400mg cpr /30", quantity: 510, price: 18800, unitPrice: 4700 },
	];

	// Filter and sort the medications
	const filteredData = Medicaments.filter((item) =>
		item.name.toLowerCase().includes(filterText.toLowerCase())
	);
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
							price:
								item.unit === "boîte"
									? item.price * quantity
									: item.unitPrice * quantity,
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
	const printInvoice = () => {
		const newWindow = window.open("", "Invoice", "width=600,height=400");
		newWindow.document.write("<html><head><title>Facture</title></head><body>");
		newWindow.document.write("<h1>Facture</h1>");
		newWindow.document.write(`<p>Date: ${new Date().toLocaleString()}</p>`);
		newWindow.document.write(`<p>Client: ${clientName}</p>`);
		newWindow.document.write(
			"<table border='1'><tr><th>Nom</th><th>Unité</th><th>Quantité</th><th>Prix</th></tr>"
		);
		addCart.forEach((item) => {
			newWindow.document.write(
				`<tr><td>${item.name}</td><td>${item.unit}</td><td>${item.quantity}</td><td>${item.price} Ar</td></tr>`
			);
		});
		newWindow.document.write("</table>");
		newWindow.document.write(`<p>État du paiement: ${paymentStatus}</p>`);
		if (paymentStatus === "Reste à payer") {
			newWindow.document.write(`<p>Reste à payer: ${remainingAmount} Ar</p>`);
		}
		newWindow.document.write("</body></html>");
		newWindow.document.close();
		newWindow.print();
	};

	// Calculate total price
	const calculateTotalPrice = () => {
		return addCart.reduce((total, item) => total + item.price, 0);
	};



	return (
		
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
				<Grid item xs={8}>
					<TableContainer component={Paper}>
						<Table stickyHeader aria-label="sticky header">
							<TableHead>
								<TableRow>
									<TableCell>
										<TableSortLabel
											active={sortColumn === "name"}
											direction={sortDirection}
											onClick={() => handleSort("name")}
										>
											Nom
										</TableSortLabel>
									</TableCell>
									<TableCell>
										<TableSortLabel
											active={sortColumn === "quantity"}
											direction={sortDirection}
											onClick={() => handleSort("quantity")}
										>
											Quantité
										</TableSortLabel>
									</TableCell>
									<TableCell>
										<TableSortLabel
											active={sortColumn === "price"}
											direction={sortDirection}
											onClick={() => handleSort("price")}
										>
											Prix
										</TableSortLabel>
									</TableCell>
									<TableCell>Actions</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{paginatedData.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{item.name}</TableCell>
										<TableCell>{item.quantity}</TableCell>
										<TableCell>{item.price} Ar</TableCell>
										<TableCell>
											<Stack direction="row" gap={2}>
												{loadingState[item.name] ? (
													<Fab
														size="small"
														aria-label="loading"
														sx={{
															background: "rgba(0, 128, 0, 1)",
															boxShadow: "0",
															color: "#fff",
															border: "1px solid rgba(0, 128, 0, 0.145)",
														}}
													>
														<CircularProgress
															size={24}
															color="inherit"
														/>
													</Fab>
												) : addCart.some(
														(cartItem) =>
															cartItem.name === item.name &&
															cartItem.unit === units[item.name]
												  ) ? (
													<Fab
														size="small"
														aria-label="added"
														sx={{
															background: "rgba(0, 128, 0, 1)",
															boxShadow: "0",
															color: "#fff",
															border: "1px solid rgba(0, 128, 0, 0.145)",
															"&:hover": {
																color: "rgba(0, 128, 0, 1)",
																background:
																	"rgba(0, 128, 0, 0.145)",
															},
														}}
													>
														<Check />
													</Fab>
												) : (
													<>
														<Select
															value={units[item.name] || "plaquette"}
															onChange={(e) =>
																setUnits({
																	...units,
																	[item.name]: e.target.value,
																})
															}
															size="small"
															sx={{ minWidth: 80 }}
														>
															<MenuItem value="plaquette">
																Plaquette
															</MenuItem>
															<MenuItem value="boîte">Boîte</MenuItem>
														</Select>
														<TextField
															type="number"
															value={quantities[item.name] || 1}
															onChange={(e) =>
																setQuantities({
																	...quantities,
																	[item.name]: parseInt(
																		e.target.value,
																		10
																	),
																})
															}
															size="small"
															sx={{ width: 60 }}
														/>
														<Fab
															size="small"
															color="success"
															aria-label="add"
															onClick={() => addToCart(item)}
														>
															<ShoppingCartOutlined />
														</Fab>
													</>
												)}
											</Stack>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5, 10, 25]}
										count={Medicaments.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										labelRowsPerPage="Lignes par page"
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={4}>
					<h2>Panier</h2>
					{addCart.length > 0 ? (
						<TableContainer component={Paper}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nom</TableCell>
										<TableCell>Unité</TableCell>
										<TableCell>Quantité</TableCell>
										<TableCell>Prix</TableCell>
										<TableCell>Prix Total</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{addCart.map((item, index) => (
										<TableRow key={index}>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.unit}</TableCell>
											<TableCell>
												<TextField
													type="number"
													value={item.quantity}
													onChange={(e) =>
														updateCartQuantity(
															item.name,
															parseInt(e.target.value, 10)
														)
													}
													size="small"
													sx={{ width: 60 }}
												/>
											</TableCell>
											<TableCell>{item.price} Ar</TableCell>
											<TableCell>{item.price * item.quantity} Ar</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							<TextField
								label="Nom du client"
								value={clientName}
								onChange={(e) => setClientName(e.target.value)}
								fullWidth
								sx={{ mt: 2 }}
							/>
							<Select
								label="État du paiement"
								value={paymentStatus}
								onChange={(e) => setPaymentStatus(e.target.value)}
								fullWidth
								sx={{ mt: 2 }}
							>
								<MenuItem value="Payé">Payé</MenuItem>
								<MenuItem value="Reste à payer">Reste à payer</MenuItem>
							</Select>
							{paymentStatus === "Reste à payer" && (
								<TextField
									label="Montant restant"
									type="number"
									value={remainingAmount}
									onChange={(e) =>
										setRemainingAmount(parseInt(e.target.value, 10))
									}
									fullWidth
									sx={{ mt: 2 }}
								/>
							)}
							<Typography variant="h6" sx={{ mt: 2 }}>
								Total: {calculateTotalPrice()} Ar
							</Typography>
							<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
								<Button
									variant="contained"
									color="primary"
									onClick={saveTransaction}
								>
									Enregistrer la transaction
								</Button>
								<Button
									variant="contained"
									color="secondary"
									onClick={printInvoice}
									startIcon={<Print />}
								>
									Imprimer la facture
								</Button>
							</Stack>
							<Toaster />
						</TableContainer>
					) : (
						<p>Votre panier est vide.</p>
					)}
				</Grid>
			</Grid>
			{/* <Toaster
				position="top-center"
				richColors
				toastOptions={{
					style: {
						background: "#4d4373",
						color: "#fff",
					},
					className: "class",
				}}
			/> */}
			{/* /* Boîte de dialogue pour afficher le message de succès */}
			<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
				<DialogTitle>Achat réussi</DialogTitle>
				<DialogContent>
					<Typography variant="body1">
						Votre achat a été enregistré avec succès !
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setDialogOpen(false);
							navigate("/transactions"); // Fermer la boîte de dialogue
							// Rediriger vers la page de transaction
							// Utiliser useNavigate() ici pour rediriger
						}}
					>
						Voir transaction
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={() => {
							setDialogOpen(false); // Fermer la boîte de dialogue
							printInvoice(); // Imprimer la facture
						}}
					>
						Imprimer la facture
					</Button>
				</DialogActions>
			</Dialog>
	);
};

export default ListMedicamentsVendeur;