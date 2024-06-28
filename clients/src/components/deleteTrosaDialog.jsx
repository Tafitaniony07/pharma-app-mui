/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import Button from "./btn/MuiButton.jsx";

const DeleteTrosaDialog = ({ open, deleteTrosa, onClose, selectedItem }) => {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle
				sx={{
					px: 5,
					mt: 2,
					color: "secondary.main",
					fontWeight: "500",
					fontSize: "21px",
				}}
			>
				Suppression de la Trosa
			</DialogTitle>
			<DialogContent
				sx={{
					px: 5,
				}}
			>
				<Typography variant="body1">Vous voulez supprimer cette trosa ?</Typography>
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
					color="error"
					text="Supprimer definitivement"
					fullWidth
					onClick={() => deleteTrosa(selectedItem)}
				></Button>
				<Button text="Annuler la suppression" fullWidth color="inherit" onClick={onClose}></Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteTrosaDialog;
