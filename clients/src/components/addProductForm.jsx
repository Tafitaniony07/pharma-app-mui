import { Box, Typography, TextField, MenuItem } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import Button from "../components/btn/MuiButton";
import FieldAddProduct from "./fieldAddProduct.jsx";
import AddProductExcel from "./addProductExcel.jsx";
import { createProduct } from "../api/product.js";

const AddProductForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
		reset,
	} = useForm({
		mode: "onTouched",
	});

	const handleRegister = (data) => {
		try {
			const datas = {
				prix_uniter: data.prix_uniter,
				prix_gros: data.prix_gros,
				qte_uniter: data.qte_uniter,
				qte_gros: data.qte_gros,
				date_peremption: data.date_peremption,
				marque: data.marque,
				detail: {
					designation: data.designation,
					famille: data.famille,
					classe: data.classe,
					qte_max: data.qte_max,
					type_uniter: data.type_uniter,
					type_gros: data.type_gros,
				},
				fournisseur: {
					nom: data.fournisseur,
					adress: data.adresse,
					contact: data.contact,
				},
			};

			createProduct(datas)
				.then((response) => {
					if (response.status === 201 && isSubmitSuccessful == true) {
						// Réinitialiser les champs du formulaire après une soumission réussie
						reset();
						toast.success("Successfully !");
					}
				})
				.catch((err) => {
					if (err.response.status === 422) {
						toast.error(err);
					}
				});
		} catch (error) {
			toast.error(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(handleRegister)}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 2,
						bgcolor: "white",
						borderRadius: 5,
						p: 5,
					}}
				>
					<Typography>Insérer un produit (Details)</Typography>
					<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
						{FieldAddProduct.map((field, index) => (
							<Box key={index} sx={{ width: "22%", flexGrow: 1 }}>
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
								>
									{field.type === "select" &&
										field.options.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
								</TextField>
							</Box>
						))}
					</Box>

					<Box sx={{ width: "24%" }}>
						<Button type="submit" text="Sauvegarder" fullWidth startIcon={<Save />} />
					</Box>
				</Box>
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
			</form>
			<AddProductExcel />
		</>
	);
};

export default AddProductForm;
