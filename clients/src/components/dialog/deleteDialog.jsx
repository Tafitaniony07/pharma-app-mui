/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import Button from "../btn/MuiButton.jsx";
import LoadingButton from "../btn/MuiLoadingButton.jsx";

const DeleteDialog = ({ open, deleteItem, onClose, selectedItem }) => {
	const [loading, setLoading] = useState(false);

	const handleDelete = async () => {
		setLoading(true);

		try {
			// Activer l'état de chargement pendant environ 1 seconde
			await new Promise((resolve) => {
				setTimeout(resolve, 1000);
			});

			// Effectuer l'opération de suppression
			await deleteItem(selectedItem);
		} finally {
			// Remettre l'état de chargement à false, que l'opération ait réussi ou échoué
			setLoading(false);
		}

		// Fermer la boîte de dialogue après la suppression
		onClose();
	};

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
				Suppression
			</DialogTitle>
			<DialogContent
				sx={{
					px: 5,
				}}
			>
				<Typography variant="body1">Voulez-vous vraiment le supprimer ?</Typography>
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
				<LoadingButton
					color="error"
					loading={loading}
					fullWidth
					onClick={handleDelete}
					text="Supprimer définitivement"
				/>
				<Button text="Annuler la suppression" fullWidth color="inherit" onClick={onClose}></Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
