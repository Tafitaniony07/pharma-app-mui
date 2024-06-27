/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { Save, Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import axios from "../api/axios.jsx";
import Button from "../components/btn/MuiButton.jsx";
import { formatDate } from "./formatDate.js";

const EditProductDialog = ({ open, onClose, selectedItem }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});

	useEffect(() => {
		if (open && selectedItem) {
			const formattedItem = {
				...selectedItem,
				date_peremption: formatDate(selectedItem.date_peremption),
			};
			reset(formattedItem); // Réinitialiser le formulaire avec les valeurs de l'élément sélectionné
		}
	}, [selectedItem, open, reset]);
	const handleEdit = async (data) => {
		toast.success("Produit mis à jour avec succès !");
		onClose();
		try {
			const response = await axios.post("/editproduct", {
				famille: data.famille,
				designation: data.designation,
				classe: data.classe,
				marque: data.marque,
				type_uniter: data.type_uniter,
				type_gros: data.type_gros,
				prix_uniter: data.prix_uniter,
				prix_gros: data.prix_gros,
				qte_uniter: data.qte_uniter,
				qte_gros: data.qte_gros,
				qte_max: data.qte_max,
				date_peremption: data.date_peremption,
				fournisseur: [data.fournisseur, data.adresse, data.contact],
			});

			if (response.status === 200) {
				toast.success("Produit mis à jour avec succès !");
				onClose();
			}
		} catch (err) {
			if (err.response?.status === 422) {
				toast.error("Erreur de validation des données");
			} else {
				toast.error("Erreur lors de la mise à jour du produit");
			}
		}
	};

	const fields = [
		{ label: "Désignation", name: "designation", type: "text" },
		{ label: "Marque", name: "marque", type: "text", disabled: true },
		{ label: "Prix unitaire", name: "prix_uniter", type: "number" },
		{ label: "Prix de gros", name: "prix_gros", type: "number" },
		{ label: "Quantité unitaire", name: "qte_uniter", type: "number" },
		{ label: "Quantité de gros", name: "qte_gros", type: "number" },
		{ label: "Quantité max", name: "qte_max", type: "number", disabled: true },
		{ label: "Date de péremption", name: "date_peremption", type: "date", autoFocus: true },
	];

	return (
		<>
			<Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
				<DialogTitle>Modifier les détails du produit</DialogTitle>
				<DialogContent>
					<form onSubmit={handleSubmit(handleEdit)}>
						<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, my: "5px", alignItems: "top" }}>
							{fields.map((field, index) => (
								<Box key={index} sx={{ width: "45%", flexGrow: 1 }}>
									<TextField
										label={field.label}
										color="primary"
										fullWidth
										{...register(field.name, {})}
										error={!!errors[field.name]}
										helperText={errors[field.name]?.message}
										type={field.type}
										autoFocus={field.autoFocus}
										disabled={field.disabled}
									/>
								</Box>
							))}
							<Button type="submit" text="Mettre à jour" color="secondary" startIcon={<Save />} />
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
						background: "#4d4373",
						color: "#fff",
					},
					className: "class",
				}}
			/>
		</>
	);
};

export default EditProductDialog;
