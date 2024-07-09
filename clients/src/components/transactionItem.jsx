import { ChevronRight, Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Box,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	Fab,
	TableRow,
	Typography,
	Button,
	Menu,
	MenuItem,
	ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ListFacture } from "../api/facture";
import DeleteDialog from "./dialog/deleteDialog.jsx";
import { isToday, isThisWeek, isThisMonth } from "date-fns";

const TransactionItem = () => {
	const [listTransactions, setListTransaction] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleDeleteTransaction = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};

	const handleDelete = () => {
		setItemToDelete(selectedItem);
	};
	const handleCloseDialog = () => {
		setOpenDeleteDialog(false);
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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

			default:
				filtered = listTransactions;
				break;
		}
		setFilteredTransactions(filtered);
		handleClose();
	};

	useEffect(() => {
		const fetch = async () => {
			const res = await ListFacture();
			setListTransaction(res.data);
			setFilteredTransactions(res.data);
			console.log(res.data);
		};
		fetch();
	}, []);

	return (
		<>
			<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
				<Typography component="h2" sx={{ fontSize: "25px" }} color="primary">
					Tous les Transactions
					<Typography component="p" color="black">
						Il y a {filteredTransactions.length} total de transactions
					</Typography>
				</Typography>
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
						<MenuItem onClick={() => handleFilterChange("")}>Tout</MenuItem>
					</Menu>
				</Box>
			</Stack>
			{filteredTransactions.map((item) => (
				<Box
					display="flex"
					flexDirection="column"
					key={item.pk}
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
								# {item.pk}
							</Typography>
							<ChevronRight />
							<Typography component="h4">{item.client}</Typography>
						</Box>
						<Typography component="div">Montant total à payer : {item.prix_total} Ar</Typography>
						<Typography component="div">Etat : {item.type_transaction}</Typography>
						<Typography
							component="div"
							color="white"
							bgcolor="secondary.main"
							px={3}
							py={0.5}
							borderRadius={10}
						>
							Date {item.date}
						</Typography>
						<Fab
							size="small"
							aria-label="delete"
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
					</Stack>
					<TableContainer sx={{ mt: 2, overflow: "hidden", borderRadius: 3 }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Nom Medicament</TableCell>
									<TableCell>Marque</TableCell>
									<TableCell>Quantité (unité)</TableCell>
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
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleCloseDialog}
				selectedItem={selectedItem}
				deleteItem={handleDelete}
			/>
		</>
	);
};

export default TransactionItem;
