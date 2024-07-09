/* eslint-disable react/prop-types */
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import Button from "../btn/MuiButton.jsx";
import LoadingButton from "../btn/MuiLoadingButton.jsx";
import useAuth from "../../hooks/useAuth.js";

const ExitDialog = ({ open, onClose }) => {
	const { logout } = useAuth();
	const [loading, setLoading] = useState(false);

	function handleClick() {
		setLoading(true);
		logout();
	}

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
				Deconnexion
			</DialogTitle>
			<DialogContent
				sx={{
					px: 5,
				}}
			>
				<Typography variant="body1">Voulez-vous vraiment vous déconnecter ?</Typography>
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
				<LoadingButton color="secondary" loading={loading} fullWidth onClick={handleClick} text="Déconnexion" />
				<Button text="Annuler " fullWidth color="inherit" onClick={onClose}></Button>
			</DialogActions>
		</Dialog>
	);
};

export default ExitDialog;
