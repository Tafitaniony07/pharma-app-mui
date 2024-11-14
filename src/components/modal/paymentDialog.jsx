/* eslint-disable react/prop-types */
import { Close, Save } from "@mui/icons-material";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { updateFacture } from "../../api/facture.js";
import LoadingButton from "../btn/MuiLoadingButton.jsx";

const PaymentDialog = ({ open, onClose, transaction, onPaymentUpdated }) => {
	const [loadingBtn, setLoadingBtn] = useState(false);
	const { register, watch, reset, handleSubmit } = useForm({ defaultValues: { prix_restant: 0 } });

	const onSubmit = async (data) => {
		if (!transaction) return null;
		setLoadingBtn(true);

		try {
			const dataF = { prix_restant: transaction?.prix_restant - data.prix_restant, pk: transaction.pk };
			const response = await updateFacture({ data: dataF, pk: transaction.pk });
			console.log("Response Data :", dataF);

			if (response.status === 200) {
				onPaymentUpdated(response.data);
				reset();
				toast.success("Paiement mis à jour avec succès !");
				onClose();
			}
		} catch (error) {
			console.error("Erreur :", error);
			toast.error("Erreur lors de la mise à jour du paiement");
		} finally {
			setLoadingBtn(false);
		}
	};

	return (
		<>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle
					sx={{
						px: 5,
						mt: 2,
						fontWeight: "500",
						fontSize: "21px",
					}}
				>
					Mettre à jour le paiement
				</DialogTitle>
				<DialogContent
					sx={{
						px: 5,
					}}
				>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 2, width: 300 }}>
							<Typography>
								Montant restant : {transaction?.prix_restant - watch("prix_restant")}
							</Typography>
							<TextField
								label="Montant payé"
								defaultValue={0}
								type="number"
								{...register("prix_restant", {
									required: "Veuillez remplir ce champ",
								})}
								fullWidth
							/>
							<LoadingButton
								type="submit"
								color="secondary"
								fullWidth
								startIcon={<Save />}
								text="Sauvegarder"
							/>
						</Box>
					</form>
				</DialogContent>
				<DialogActions sx={{ position: "absolute", right: "0", top: "0" }}>
					<Fab size="small" aria-label="view" onClick={onClose} sx={{ boxShadow: "0" }}>
						<Close />
					</Fab>
				</DialogActions>
			</Dialog>
			<Toaster
				position="top-center"
				richColors
				toastOptions={{
					style: {
						background: "#045D5D",
						color: "#fff",
					},
					className: "class",
				}}
			/>
		</>
	);
};

export default PaymentDialog;
