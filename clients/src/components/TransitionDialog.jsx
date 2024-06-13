/* eslint-disable react/prop-types */
// TransactionDialog.js
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const TransactionDialog = ({ dialogOpen, setDialogOpen, navigate, printInvoice }) => {
	return (
		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
			<DialogTitle>Achat réussi</DialogTitle>
			<DialogContent>
				<Typography variant="body1">Votre achat a été enregistré avec succès !</Typography>
			</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						setDialogOpen(false);
						navigate("/transactions");
					}}
				>
					Voir transaction
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => {
						setDialogOpen(false);
						printInvoice();
					}}
				>
					Imprimer la facture
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TransactionDialog;
