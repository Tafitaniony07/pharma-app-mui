/* eslint-disable react/prop-types */

import { Close } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, Typography } from "@mui/material";
import handlePrint from "../../pages/facture/page.jsx";
import Button from "../btn/MuiButton.jsx";

const AchatDialog = ({ dialogOpen, setDialogOpen, onClose, navigate, transaction }) => {
	return (
		<Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
			<DialogTitle
				sx={{
					px: 5,
					mt: 2,
				}}
			>
				Achat validé
			</DialogTitle>
			<DialogContent
				sx={{
					px: 5,
				}}
			>
				<Typography variant="body1">Transaction enregistrée avec succès</Typography>
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
				<Fab
					size="small"
					aria-label="view"
					onClick={onClose}
					sx={{ boxShadow: "0", position: "absolute", right: 5, top: 5, bgcolor: "#ff000011" }}
				>
					<Close />
				</Fab>
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
