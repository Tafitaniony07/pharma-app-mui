import React, { useContext, useState } from "react";
import { TransactionContext } from "./TransactionContext";
import {
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Container,
	Typography,
	Button,
	ThemeProvider,
	createTheme,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Select,
	MenuItem,
	TableFooter,
	TableContainer,
	Paper,
} from "@mui/material";

const TransactionsPage = () => {
	const { transactions, updateTransaction, deleteTransaction } = useContext(TransactionContext);
	const [open, setOpen] = useState(false);
	const [selectedTransaction, setSelectedTransaction] = useState(null);
	const [selectedItemIndex, setSelectedItemIndex] = useState(null);
	const [updatedItem, setUpdatedItem] = useState({});
	const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState("");
	const [partialPayments, setPartialPayments] = useState({});

	const handleOpenDialog = (transaction, itemIndex) => {
		setSelectedTransaction(transaction);
		setSelectedItemIndex(itemIndex);
		setUpdatedItem(transaction.items[itemIndex]);
		setUpdatedPaymentStatus(transaction.paymentStatus);
		setOpen(true);
	};

	const handleCloseDialog = () => {
		setOpen(false);
		setSelectedTransaction(null);
		setSelectedItemIndex(null);
		setUpdatedItem({});
		setUpdatedPaymentStatus("");
	};

	const handleUpdateTransaction = () => {
		if (selectedTransaction !== null && selectedItemIndex !== null) {
			const updatedTransaction = { ...selectedTransaction };
			updatedTransaction.items[selectedItemIndex] = updatedItem;
			updatedTransaction.paymentStatus = updatedPaymentStatus;
			updatedTransaction.date = new Date();
			updateTransaction(transactions.indexOf(selectedTransaction), updatedTransaction);
		}
		handleCloseDialog();
	};

	const handleDeleteItem = (transactionIndex, itemIndex) => {
		const updatedTransaction = { ...transactions[transactionIndex] };
		updatedTransaction.items = updatedTransaction.items.filter((_, i) => i !== itemIndex);
		if (updatedTransaction.items.length > 0) {
			updateTransaction(transactionIndex, updatedTransaction);
		} else {
			deleteTransaction(transactionIndex);
		}
	};

	const handleMarkAsPaid = (transactionIndex) => {
		const updatedTransaction = { ...transactions[transactionIndex] };
		updatedTransaction.paymentStatus = "Payé";
		updatedTransaction.totalPaid = updatedTransaction.items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		updatedTransaction.date = new Date();
		updateTransaction(transactionIndex, updatedTransaction);
	};

	const handlePartialPaymentChange = (transactionIndex, value) => {
		setPartialPayments({ ...partialPayments, [transactionIndex]: value });
	};

	const handlePartialPayment = (transactionIndex) => {
		const partialAmount = parseFloat(partialPayments[transactionIndex]);
		if (isNaN(partialAmount) || partialAmount <= 0) return;

		const updatedTransaction = { ...transactions[transactionIndex] };
		updatedTransaction.totalPaid = (updatedTransaction.totalPaid || 0) + partialAmount;
		updatedTransaction.paymentStatus =
			updatedTransaction.totalPaid >=
			updatedTransaction.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
				? "Payé"
				: "Reste à payer";
		updatedTransaction.date = new Date();
		updateTransaction(transactionIndex, updatedTransaction);
		handlePartialPaymentChange(transactionIndex, "");
	};

	const getPaymentStatus = (transaction) => {
		const totalAmount = transaction.items.reduce(
			(acc, item) => acc + item.price * item.quantity,
			0
		);
		const paymentStatus =
			transaction.totalPaid >= totalAmount
				? "Payé"
				: `Restant ${(totalAmount - transaction.totalPaid).toFixed(2)} Ar`;
		return paymentStatus;
	};

	const handleDeleteTransaction = (transactionIndex) => {
		// Supprimer la transaction
		deleteTransaction(transactionIndex);
	};
	const tableTheme = createTheme({
		components: {
			MuiTableCell: {
				styleOverrides: {
					head: {
						padding: "15px",
						background: "#4d4373",
						color: "#fff",
						fontFamily: "Exo2-Medium",
						fontSize: "18px",
					},
					body: {
						background: "#fcfffc",
						padding: "10px",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={tableTheme}>
			<Container>
				<Typography variant="h4" gutterBottom>
					Historique des Transactions
				</Typography>
				{transactions.length > 0 ? (
					transactions.map((transaction, transactionIndex) => (
						<TableContainer
							component={Paper}
							key={transactionIndex}
							style={{ marginBottom: "20px" }}
						>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell colSpan={6}>
											<Typography variant="h6">
												Transaction {transactionIndex + 1}
											</Typography>
										</TableCell>
										<TableCell colSpan={4}>
											<Button
												variant="contained"
												color="secondary"
												onClick={() =>
													handleDeleteTransaction(transactionIndex)
												}
												style={{ marginLeft: "8px" }}
											>
												Supprimer la transaction
											</Button>
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>Date</TableCell>
										<TableCell>Client</TableCell>
										<TableCell>Nom</TableCell>
										<TableCell>Unité</TableCell>
										<TableCell>Quantité</TableCell>
										<TableCell>Prix Unitaire</TableCell>
										<TableCell>Prix Total</TableCell>
										<TableCell>Actions</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{transaction.items.map((item, itemIndex) => (
										<TableRow key={`${transactionIndex}-${itemIndex}`}>
											{itemIndex === 0 && (
												<TableCell rowSpan={transaction.items.length}>
													{new Date(transaction.date).toLocaleString()}
												</TableCell>
											)}
											{itemIndex === 0 && (
												<TableCell rowSpan={transaction.items.length}>
													{transaction.clientName}
												</TableCell>
											)}
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.unit}</TableCell>
											<TableCell>{item.quantity}</TableCell>
											<TableCell>{item.price} Ar</TableCell>
											<TableCell>{item.price * item.quantity} Ar</TableCell>
											<TableCell>
												<Button
													variant="contained"
													color="primary"
													onClick={() =>
														handleOpenDialog(transaction, itemIndex)
													}
												>
													Mettre à jour
												</Button>
												<Button
													variant="contained"
													color="secondary"
													onClick={() =>
														handleDeleteItem(
															transactionIndex,
															itemIndex
														)
													}
													style={{ marginLeft: "8px" }}
												>
													Supprimer
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell colSpan={6}>
											Total:{" "}
											{transaction.items.reduce(
												(acc, item) => acc + item.price * item.quantity,
												0
											)}{" "}
											Ar
										</TableCell>
										<TableCell colSpan={2}>
											État: {getPaymentStatus(transaction)}
										</TableCell>
									</TableRow>
									{transaction.paymentStatus !== "Payé" && (
										<TableRow>
											<TableCell colSpan={6}></TableCell>
											<TableCell colSpan={2}>
												<Button
													variant="contained"
													color="primary"
													onClick={() =>
														handleMarkAsPaid(transactionIndex)
													}
													style={{ marginBottom: "10px" }}
												>
													Marquer comme Payé
												</Button>
												<TextField
													label="Paiement partiel"
													type="number"
													value={partialPayments[transactionIndex] || ""}
													onChange={(e) =>
														handlePartialPaymentChange(
															transactionIndex,
															e.target.value
														)
													}
													style={{
														marginBottom: "10px",
														display: "block",
													}}
												/>
												<Button
													variant="contained"
													color="primary"
													onClick={() =>
														handlePartialPayment(transactionIndex)
													}
												>
													Enregistrer Paiement
												</Button>
											</TableCell>
										</TableRow>
									)}
								</TableFooter>
							</Table>
						</TableContainer>
					))
				) : (
					<p>Aucune transaction enregistrée.</p>
				)}
				<Dialog open={open} onClose={handleCloseDialog}>
					<DialogTitle>Mettre à jour larticle</DialogTitle>
					<DialogContent>
						<DialogContentText>Modifiez les détails de  l'article.</DialogContentText>
						<TextField
							autoFocus
							margin="dense"
							label="Nom de l'article"
							type="text"
							fullWidth
							value={updatedItem.name}
							onChange={(e) =>
								setUpdatedItem({ ...updatedItem, name: e.target.value })
							}
						/>
						<TextField
							margin="dense"
							label="Unité"
							type="text"
							fullWidth
							value={updatedItem.unit}
							onChange={(e) =>
								setUpdatedItem({ ...updatedItem, unit: e.target.value })
							}
						/>
						<TextField
							margin="dense"
							label="Quantité"
							type="number"
							fullWidth
							value={updatedItem.quantity}
							onChange={(e) =>
								setUpdatedItem({ ...updatedItem, quantity: e.target.value })
							}
						/>
						<TextField
							margin="dense"
							label="Prix"
							type="number"
							fullWidth
							value={updatedItem.price}
							onChange={(e) =>
								setUpdatedItem({ ...updatedItem, price: e.target.value })
							}
						/>
						<Select
							margin="dense"
							fullWidth
							value={updatedPaymentStatus}
							onChange={(e) => setUpdatedPaymentStatus(e.target.value)}
						>
							<MenuItem value="Payé">Payé</MenuItem>
							<MenuItem value="Reste à payer">Reste à payer</MenuItem>
						</Select>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCloseDialog} color="primary">
							Annuler
						</Button>
						<Button onClick={handleUpdateTransaction} color="primary">
							Mettre à jour
						</Button>
					</DialogActions>
				</Dialog>
			</Container>
		</ThemeProvider>
	);
};

export default TransactionsPage;
