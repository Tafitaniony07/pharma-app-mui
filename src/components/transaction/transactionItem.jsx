/* eslint-disable react/no-unescaped-entities */
import { ChevronRight, Delete, Edit, ExpandLess, ExpandMore, Print } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
	Box,
	Button,
	Fab,
	InputAdornment,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { isThisMonth, isThisWeek, isToday } from "date-fns";
import { useEffect, useState } from "react";
import { deleteFacture, ListFacture } from "../../api/facture.js";
import useAuth from "../../hooks/useAuth.js";
import handlePrint from "../../pages/facture/page.jsx";
import DeleteDialog from "../modal/deleteDialog.jsx";
import PaymentDialog from "../modal/paymentDialog";

const TransactionItem = () => {
	// État pour stocker la liste complète des transactions
	const [listTransactions, setListTransaction] = useState([]);
	// État pour stocker le texte de recherche
	const [searchText, setSearchText] = useState("");
	// État pour stocker les transactions filtrées
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	// État pour stocker l'élément sélectionné
	const [selectedItem, setSelectedItem] = useState(null);
	// État pour stocker la transaction sélectionnée pour le paiement
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	// État pour forcer le rafraîchissement des factures
	const [stateFacture, setStateFacture] = useState(false);
	// État pour gérer l'ancrage du menu
	const [anchorEl, setAnchorEl] = useState(null);
	// Récupération des informations du compte utilisateur
	const { account } = useAuth();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

	/**
	 * Gère la recherche de transactions par nom de client
	 * @param {Event} event - L'événement de changement du champ de recherche
	 */
	const handleSearchChange = (event) => {
		const value = event.target.value.toLowerCase();
		setSearchText(value);
		const filtered = listTransactions.filter((transaction) => transaction.client.toLowerCase().includes(value));
		setFilteredTransactions(filtered);
	};

	/**
	 * Ouvre la boîte de dialogue de paiement pour une transaction
	 * @param {Object} transaction - La transaction à payer
	 */
	const handleOpenPaymentDialog = (transaction) => {
		setSelectedTransaction(transaction);
		console.log(transaction);
		setOpenPaymentDialog(true);
	};

	/**
	 * Met à jour la liste des transactions après un paiement
	 * @param {Object} updatedTransaction - La transaction mise à jour
	 */
	const handlePaymentUpdated = (updatedTransaction) => {
		const updatedTransactions = listTransactions.map((trans) =>
			trans.pk === updatedTransaction.pk ? updatedTransaction : trans
		);
		setListTransaction(updatedTransactions);
		setFilteredTransactions(updatedTransactions);
	};

	/**
	 * Prépare la suppression d'une transaction
	 * @param {Object} item - La transaction à supprimer
	 */
	const handleDeleteTransaction = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};

	/**
	 * Effectue la suppression d'une facture
	 * @param {string} s - L'identifiant de la facture à supprimer
	 */
	const handleDelete = async (s) => {
		try {
			await deleteFacture(s);
			setStateFacture((s) => !s);
		} catch (error) {
			console.log(error);
		}
	};
	/**
	 * Ferme la boîte de dialogue de suppression
	 */
	const handleCloseDialog = () => {
		setOpenDeleteDialog(false);
	};
	/**
	 * Gère l'ouverture du menu de filtres
	 * @param {Event} event - L'événement de clic
	 */
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	/**
	 * Ferme le menu de filtres
	 */
	const handleClose = () => {
		setAnchorEl(null);
	};
	/**
	 * Applique un filtre sur la liste des transactions
	 * @param {string} filter - Le type de filtre à appliquer
	 */
	const handleFilterChange = (filter) => {
		let filtered = [];
		switch (filter) {
			case "today":
				filtered = listTransactions.filter((transaction) =>
					transaction.produits.some((product) => isToday(new Date(product.date)))
				);
				break;
			case "thisWeek":
				filtered = listTransactions.filter((transaction) =>
					transaction.produits.some((product) => isThisWeek(new Date(product.date)))
				);
				break;
			case "thisMonth":
				filtered = listTransactions.filter((transaction) =>
					transaction.produits.some((product) => isThisMonth(new Date(product.date)))
				);
				break;
			case "paye":
				filtered = listTransactions.filter((transaction) => parseInt(transaction.prix_restant) === 0);
				break;
			case "nonPaye":
				filtered = listTransactions.filter((transaction) => parseInt(transaction.prix_restant) > 0);
				break;
			default:
				filtered = listTransactions;
				break;
		}
		setFilteredTransactions(filtered);
		handleClose();
	};
	/**
	 * Effet pour charger la liste initiale des factures
	 */
	useEffect(() => {
		const fetch = async () => {
			const res = await ListFacture();
			setListTransaction(res.data);
			setFilteredTransactions(res.data);
			console.log(res.data);
		};
		fetch();
	}, [stateFacture]);

	return (
		<>
			<Stack spacing={15} direction="row" alignItems="center" justifyContent="space-between" pb={3}>
				<Typography component="h2" sx={{ fontSize: "25px" }} color="primary">
					Tous les Transactions
					<Typography component="p" color="black">
						Il y a {filteredTransactions.length} total de transactions
					</Typography>
				</Typography>
				<Box flexGrow={1}>
					<TextField
						label="Rechercher"
						fullWidth
						size="medium"
						value={searchText} // Ajoutez la valeur ici
						onChange={handleSearchChange} // Appelez handleSearchChange lors du changement
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Box>
				<Box>
					<Button
						aria-controls="filter-menu"
						aria-haspopup="true"
						variant="outlined"
						onClick={handleClick}
						sx={{
							minHeight: 48,
							justifyContent: "initial",
							color: "secondary.main",
							px: 5,
							borderRadius: "50px",
						}}
						endIcon={anchorEl ? <ExpandLess /> : <ExpandMore />}
					>
						<ListItemText primary="Filtrer par" sx={{ textTransform: "capitalize" }} />
					</Button>
					<Menu
						id="filter-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
						sx={{
							"& .MuiPaper-root": {
								boxShadow: "none",
								width: "150px",
							},
						}}
					>
						<MenuItem onClick={() => handleFilterChange("today")}>Aujourd'hui</MenuItem>
						<MenuItem onClick={() => handleFilterChange("thisWeek")}>Cette semaine</MenuItem>
						<MenuItem onClick={() => handleFilterChange("thisMonth")}>Ce mois-ci</MenuItem>
						<MenuItem onClick={() => handleFilterChange("paye")}>Payé</MenuItem>
						<MenuItem onClick={() => handleFilterChange("nonPaye")}>Non payé</MenuItem>
						<MenuItem onClick={() => handleFilterChange("")}>Tout</MenuItem>
					</Menu>
				</Box>
			</Stack>
			<Box
				sx={{
					maxHeight: "66vh", // Définir une hauteur maximale
					overflowY: "auto", // Définir une hauteur maximale
				}}
			>
				{filteredTransactions.map((item, i) => (
					<Box
						key={i}
						id={`transaction-${i}`}
						display="flex"
						flexDirection="column"
						p={2}
						sx={{
							background: "#045D5D03",
							borderRadius: 3,
							border: "1px solid transparent",
						}}
						my={2}
					>
						<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
							<Box display={"flex"} alignItems={"center"}>
								<Typography
									component="div"
									sx={{
										borderRadius: "0px 20px 20px 0px",
										color: "#fff",
										mr: 2,
										ml: "-20px",
										bgcolor: "primary.main",
										px: 3,
										py: 0.5,
									}}
								>
									# {i + 1}
								</Typography>
								<ChevronRight />
								<Typography component="h4">{item.client}</Typography>
							</Box>
							<Typography component="h4">Montant total : {item.prix_total} Ar</Typography>
							<Typography
								component="div"
								sx={{
									background: `${
										parseInt(item.prix_restant) > 0
											? "rgba(255, 0, 0, 0.115)"
											: "rgba(0, 128, 0, 0.105)"
									}`,
								}}
								px={2}
								py={1}
								borderRadius={5}
							>
								Etat :{" "}
								{parseInt(item.prix_restant) > 0 ? `Restant( ${item.prix_restant} Ar )` : "Tout payé"}
							</Typography>
							<Typography component="h4">{item.produits.length > 0 ? item.date : "N/A"}</Typography>
							<Stack direction="row" spacing={2} sx={{ mt: 3 }}>
								<Fab
									size="small"
									aria-label="delete"
									disabled={account.account_type === "proprios" ? true : false}
									onClick={() => handleDeleteTransaction(item)}
									sx={{
										background: "rgba(255, 0, 0, 0.105)",
										boxShadow: "0",
										border: "1px solid rgba(255, 0, 0, 0.145)",
										"&:hover": {
											background: "rgba(255, 0, 0, 0.245)",
											color: "red",
										},
										zIndex: 0,
									}}
								>
									<Delete />
								</Fab>
								{parseInt(item.prix_restant) > 0 ? (
									<Fab
										size="small"
										aria-label="edit"
										onClick={() => handleOpenPaymentDialog(item)}
										sx={{
											background: "rgba(0, 128, 0, 0.105)",
											boxShadow: "0",
											border: "1px solid rgba(0, 128, 0, 0.145)",
											"&:hover": {
												background: "rgba(0, 128, 0, 0.145)",
												color: "secondary.main",
											},
											zIndex: 0,
										}}
									>
										<Edit />
									</Fab>
								) : (
									""
								)}

								<Fab
									size="small"
									aria-label="print"
									onClick={() => handlePrint(item)}
									sx={{
										background: "rgba(0, 128, 0, 0.105)",
										boxShadow: "0",
										border: "1px solid rgba(0, 128, 0, 0.145)",
										"&:hover": {
											background: "rgba(0, 128, 0, 0.145)",
											color: "secondary.main",
										},
										zIndex: 0,
									}}
								>
									<Print />
								</Fab>
							</Stack>
						</Stack>
						<TableContainer sx={{ mt: 2, overflow: "hidden", borderRadius: 3 }}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Nom Medicament</TableCell>
										<TableCell>Marque</TableCell>
										<TableCell>Quantité (unitaire)</TableCell>
										<TableCell>Quantité (gros)</TableCell>
										<TableCell>Prix (Ar)</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{item.produits.map((medicament, index) => (
										<TableRow key={index}>
											<TableCell>{medicament.product}</TableCell>
											<TableCell>{medicament.marque}</TableCell>
											<TableCell>{medicament.qte_uniter_transaction}</TableCell>
											<TableCell>{medicament.qte_gros_transaction}</TableCell>
											<TableCell>{medicament.prix_total}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				))}
			</Box>
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleCloseDialog}
				selectedItem={selectedItem}
				deleteItem={handleDelete}
			/>
			<PaymentDialog
				open={openPaymentDialog}
				onClose={() => setOpenPaymentDialog(false)}
				transaction={selectedTransaction}
				onPaymentUpdated={handlePaymentUpdated}
			/>
		</>
	);
};

export default TransactionItem;
