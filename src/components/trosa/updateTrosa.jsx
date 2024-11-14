/* eslint-disable no-unused-vars */
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import Button from "../btn/MuiButton.jsx";
import { Close, Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const UpdateTrosa = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const handleEdit = (item) => {
		setSelectedItem(item);
		setOpenDialog(true);
	};
	const onSubmitEdit = () => {
		console.log("");
	};
	const handleCloseEditDialog = () => {
		setOpenDialog(false);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	const items = [
		{ label: "Fournisseur", name: "fournisseur" },
		{ label: "Adresse", name: "adresse" },
		{ label: "Numero de téléphone", name: "phone_number]" },
		{ label: "Montant Restant", name: "montant_restant", type: "number" },
	];
	return (
		<Dialog open={openDialog} onClose={handleCloseEditDialog}>
			<DialogTitle>Modifier le produit</DialogTitle>
			<form onSubmit={handleSubmit(onSubmitEdit)}>
				<DialogContent>
					{selectedItem &&
						items.map((field, index) => (
							<Box key={index} sx={{ width: "45%", flexGrow: 1 }}>
								<TextField
									label={field.label}
									color="primary"
									fullWidth
									{...register(field.name, {
										required: "Veuillez remplir ce champ",
									})}
									error={!!errors[field.name]}
									helperText={errors[field.name]?.message}
									type={field.type}
									defaultValue={field.defaultValue}
									autoFocus={field.autoFocus}
									select={field.type === "select"}
								></TextField>
							</Box>
						))}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleCloseEditDialog}
						sx={{
							p: 1,
							textTransform: "capitalize",
							backgroundColor: "rgba(255, 0, 0, 0.845)",
							fontFamily: "Exo2-Medium",
							fontSize: "18px",
							color: "#fff",
							"&:hover": {
								backgroundColor: "rgba(255, 0, 0, 0.745)",
							},
							"&:active": {
								backgroundColor: "rgba(255, 0, 0, 0.745)",
								borderColor: "rgba(255, 0, 0, 0.745)",
							},
						}}
						size="medium"
						variant="contained"
						disableElevation
						fullWidth
						startIcon={<Close />}
					>
						Annuler
					</Button>
					<Button
						onClick={handleCloseEditDialog}
						sx={{
							p: 1,
							textTransform: "capitalize",
							backgroundColor: "secondary.main",
							fontFamily: "Exo2-Medium",
							fontSize: "18px",
							color: "#fff",
							"&:hover": {
								backgroundColor: "secondary.main",
							},
							"&:active": {
								backgroundColor: "secondary.main",
								borderColor: "secondary.main",
							},
						}}
						size="medium"
						variant="contained"
						disableElevation
						fullWidth
						startIcon={<Save />}
					>
						Enregistrer
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default UpdateTrosa;
