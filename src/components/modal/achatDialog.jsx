/* eslint-disable react/prop-types */

import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import handlePrint from "../../pages/facture/page.jsx";
import Button from "../btn/MuiButton.jsx";

const AchatDialog = ({ dialogOpen, setDialogOpen, navigate, transaction }) => {
	console.log(transaction);
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
						navigate("/list_transaction_vendeur");
					}}
				></Button>
				<Button
					text="Imprimer la facture"
					fullWidth
					color="inherit"
					onClick={() => {
						setDialogOpen(false);
						handlePrint(transaction);
					}}
				></Button>
			</DialogActions>
		</Dialog>
	);
};

export default AchatDialog;
