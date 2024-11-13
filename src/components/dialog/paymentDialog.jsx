// import { useState } from "react";
// import { Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
// import { Save, Close } from "@mui/icons-material";
// import { toast, Toaster } from "sonner";
// // import { updateTransaction } from "../../api/transaction"; // Fonction API à ajuster

// const PaymentDialog = ({ open, onClose, transaction, onPaymentUpdated }) => {
// 	const [loadingBtn, setLoadingBtn] = useState(false);
// 	const [amountPaid, setAmountPaid] = useState("");

// 	const handlePayment = async () => {
// 		setLoadingBtn(true);
// 		try {
// 			const updatedTransaction = {
// 				...transaction,
// 				prix_restant: transaction.prix_restant - amountPaid,
// 			};
// 			// const response = await updateTransaction(transaction.pk, updatedTransaction);

// 			if (response.status === 200) {
// 				onPaymentUpdated(response.data); // Mise à jour dans l'historique
// 				toast.success("Paiement mis à jour avec succès !");
// 				onClose();
// 			}
// 		} catch (error) {
// 			toast.error("Erreur lors de la mise à jour du paiement");
// 		} finally {
// 			setLoadingBtn(false);
// 		}
// 	};

// 	return (
// 		<>
// 			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
// 				<DialogTitle>Mettre à jour le paiement</DialogTitle>
// 				<DialogContent>
// 					<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
// 						<TextField
// 							label="Montant payé"
// 							type="number"
// 							value={amountPaid}
// 							onChange={(e) => setAmountPaid(Number(e.target.value))}
// 							fullWidth
// 						/>
// 					</Box>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={onClose} startIcon={<Close />}>
// 						Annuler
// 					</Button>
// 					<Button onClick={handlePayment} startIcon={<Save />} disabled={loadingBtn}>
// 						Sauvegarder
// 					</Button>
// 				</DialogActions>
// 			</Dialog>
// 			<Toaster position="top-center" />
// 		</>
// 	);
// };

// export default PaymentDialog;
