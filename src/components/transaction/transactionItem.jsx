/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteFacture, ListFacture } from "../../api/facture.js";
import useAuth from "../../hooks/useAuth.js";
import useTransactionFilter from "../../hooks/useFilterTransaction.js";
import useVendeur from "../../hooks/useVendeur.js";
import handlePrint from "../../pages/facture/page.jsx";
import SearchField from "../field/searchField.jsx";
import DeleteDialog from "../modal/deleteDialog.jsx";
import PaymentDialog from "../modal/paymentDialog";
import VendeurList from "../vendeurList/vendeurList.jsx";
import FilterTransactions from "./filterTransaction.jsx";
import TransactionData from "./transactionData.jsx";

const TransactionItem = () => {
	// États pour la gestion des transactions
	const [listTransactions, setListTransaction] = useState([]);
	const [activeFilter, setActiveFilter] = useState("");
	const [selectedTransaction, setSelectedTransaction] = useState(null);

	// États pour la gestion des dialogues et des éléments sélectionnés
	const [selectedItem, setSelectedItem] = useState(null);
	const [stateFacture, setStateFacture] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openPaymentDialog, setOpenPaymentDialog] = useState(false);

	const {
		filteredTransactions,
		setFilteredTransactions,
		searchText,
		setSearchText,
		selectedVendeur,
		setSelectedVendeur,
		setAnchorElFilter,
	} = useTransactionFilter(listTransactions);
	const listVendeur = useVendeur();

	// Authentification
	const { account } = useAuth();

	const handleSearchChange = (event) => {
		const value = event.target.value.toLowerCase();
		setSearchText(value);
	};

	const handleVendeurCheckboxChange = (username) => {
		setSelectedVendeur((prev) => ({ ...prev, [username]: !prev[username] }));
	};

	const handleFilterChange = (filter) => {
		setActiveFilter(filter);
		setAnchorElFilter(filter);
		handleClose();
	};

	useEffect(() => {
		const fetchTransactions = async () => {
			try {
				const res = await ListFacture();
				setListTransaction(res.data);
				setFilteredTransactions(res.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchTransactions();
	}, [stateFacture]);

	const handleOpenPaymentDialog = (transaction) => {
		setSelectedTransaction(transaction);
		setOpenPaymentDialog(true);
	};

	const handlePaymentUpdated = (updatedTransaction) => {
		const updatedTransactions = listTransactions.map((trans) =>
			trans.pk === updatedTransaction.pk ? updatedTransaction : trans
		);
		setListTransaction(updatedTransactions);
		setFilteredTransactions(updatedTransactions);
	};

	const handleDeleteTransaction = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};

	const handleDelete = async (id) => {
		try {
			await deleteFacture(id);
			setStateFacture((prev) => !prev);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCloseDialog = () => setOpenDeleteDialog(false);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<>
			<Stack spacing={15} direction="row" alignItems="center" justifyContent="space-between" pb={1}>
				<Typography component="h2" sx={{ fontSize: "25px" }} color="primary">
					Tous les Transactions
					<Typography component="p" color="black">
						Il y a {filteredTransactions.length} total de transactions
					</Typography>
				</Typography>
				<Box flexGrow={1}>
					<SearchField searchText={searchText} searchChange={handleSearchChange} />
				</Box>
				<Box>
					<FilterTransactions
						anchorEl={anchorEl}
						onClick={handleClick}
						onClose={handleClose}
						activeFilter={activeFilter}
						filterChange={handleFilterChange}
					/>
				</Box>
			</Stack>
			<Stack direction="row" alignItems="center" pb={2} pl={1}>
				<VendeurList
					data={listVendeur}
					selected={selectedVendeur}
					vendeurCheckboxChange={handleVendeurCheckboxChange}
				/>
			</Stack>
			<Box
				sx={{
					maxHeight: "66vh",
					overflowY: "auto",
				}}
			>
				<TransactionData
					data={filteredTransactions}
					deleteTransaction={handleDeleteTransaction}
					openPaymentDialog={handleOpenPaymentDialog}
					print={handlePrint}
					account={account}
				/>
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
