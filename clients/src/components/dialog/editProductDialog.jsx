/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Fab } from "@mui/material";
import { Save, Close } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { formatDate } from "../formatDate.js";
import { UpdateProduct } from "../../api/product.js";
import LoadingButton from "../btn/MuiLoadingButton.jsx";

const EditProductDialog = ({ open, onClose, selectedItem, onProductUpdated }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});
	const [loadingBtn, setLoadingBtn] = useState(false);

	useEffect(() => {
		if (open && selectedItem) {
			const formattedItem = {
				...selectedItem.detail_product,
				...selectedItem,
				marque: selectedItem.marque_product,
				date_peremption: selectedItem.date_peremption,
				qte_uniter: 0,
				qte_gros: 0,
			};
			reset(formattedItem); // Réinitialiser le formulaire avec les valeurs de l'élément sélectionné
		}
	}, [selectedItem, open, reset]);

	const handleEdit = async (data) => {
		setLoadingBtn(true);
		try {
			const response = await UpdateProduct(data.pk, {
				pk: data.pk,
				qte_uniter: data.qte_uniter,
				qte_gros: data.qte_gros,
				prix_uniter: data.prix_uniter,
				prix_gros: data.prix_gros,
				date_peremption : data.date_peremption
			});

			if (response.status === 200) {
				onProductUpdated(response.data); // Utilisez la fonction de rappel pour mettre à jour le produit
				toast.success("Produit mis à jour avec succès !");
				setLoadingBtn(false);

				onClose();
			}
		} catch (err) {
			if (err.response?.status === 422) {
				setLoadingBtn(false);
				toast.error("Erreur de validation des données");
			} else {
				setLoadingBtn(false);
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
		{ label: "Date de péremption", name: "date_peremption", type: "date", autoFocus: true },
		{ label: "Quantité max", name: "qte_max", type: "number", disabled: true },
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
										{...register(field.name, {
											required: "Veuillez remplir ce champ",
										})}
										error={!!errors[field.name]}
										helperText={errors[field.name]?.message}
										type={field.type}
										autoFocus={field?.autoFocus}
										disabled={field.disabled}
									/>
								</Box>
							))}
							{/* <Button type="submit" text="Mettre à jour" color="secondary" startIcon={<Save />} /> */}
							<LoadingButton
								type="submit"
								color="secondary"
								text="Sauvegarder"
								loadingPosition="start"
								startIcon={<Save />}
								loading={loadingBtn}
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
