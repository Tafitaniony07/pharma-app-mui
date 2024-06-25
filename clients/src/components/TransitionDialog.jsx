/* eslint-disable react/prop-types */
// TransactionDialog.js
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import Button from "./btn/MuiButton.jsx";

const TransactionDialog = ({ dialogOpen, setDialogOpen, navigate, printInvoice }) => {
	return (
		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
			<DialogTitle
				sx={{
					px: 5,
					mt: 2,
				}}
			>
				Achat réussi
			</DialogTitle>
			<DialogContent
				sx={{
					px: 5,
				}}
			>
				<Typography variant="body1">Votre achat a été enregistré avec succès !</Typography>
			</DialogContent>
			<DialogActions
				sx={{
					px: 5,
					flexDirection: "column",
					gap: 2,
					justifyContent: "center",
					pb: 5,
					"& > :not(style) ~ :not(style)": { marginLeft: 0 },
				}}
			>
				<Button
					color="secondary"
					text="Voir la transaction"
					fullWidth
					onClick={() => {
						setDialogOpen(false);
						navigate("/transactions");
					}}
				></Button>
				<Button
					text="Imprimer la facture"
					fullWidth
					color="inherit"
					onClick={() => {
						setDialogOpen(false);
						printInvoice();
					}}
				></Button>
			</DialogActions>
		</Dialog>
	);
};

export default TransactionDialog;
