/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Typography, Autocomplete } from "@mui/material";
import { Save } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import FieldAddProduct from "./labelAddProduct.jsx";
import AddProductExcel from "./addProductExcel.jsx";
import { createProduct } from "../../api/product.js";
import LoadingButton from "../btn/MuiLoadingButton.jsx";
import { useEffect, useState } from "react";
import InputAddProduct from "./Input.jsx";
import { ListFournisseur } from "../../api/fournisseur.js";

const AddProductForm = () => {
	const {
		handleSubmit,
		formState: { errors },
		resetField,
		setValue,
		control,
		setFocus,
	} = useForm({
		mode: "onTouched",
	});
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [fournisseur, setSelectFournisseur] = useState([]);
	const [valuefounisseur, setValuefounisseur] = useState("");
	const handleRegister = (data) => {
		setLoadingBtn(true);
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
					if (response.status === 201 || response.statusText === "Created") {
						setLoadingBtn(false);
						resetField();
						toast.success("Ajout du produit avec succès !");
						// Réinitialiser les champs du formulaire après une soumission réussie
					}
				})
				.catch((err) => {
					setLoadingBtn(false);
					console.log("errr", err);
					toast.error(err);
				});
		} catch (error) {
			setLoadingBtn(false);
			toast.error(error);
		}
	};
	useEffect(() => {
		fournisseur.map((f) => {
			if (valuefounisseur === f.nom) {
				setValue("adresse", f.adress);
				setValue("contact", f.contact);
				setFocus("contact");
			}
		});
	}, [valuefounisseur]);
	useEffect(() => {
		try {
			ListFournisseur().then((res) => setSelectFournisseur(res.data));
		} catch (error) {
			throw err;
		}
	}, []);
	return (
		<Box
			Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "stretch",
				gap: 2,
			}}
		>
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
								{field.name === "fournisseur" ? (
									<Autocomplete
										id="founisseur"
										freeSolo
										value={valuefounisseur}
										onChange={(event, newValue) => {
											setValuefounisseur(newValue);
										}}
										options={fournisseur.map((f) => f.nom)}
										renderInput={(params) => (
											<InputAddProduct
												params={params}
												field={field}
												errors={errors}
												control={control}
												setValue={setValue}
											/>
										)}
									/>
								) : (
									<InputAddProduct field={field} errors={errors} control={control} />
								)}
							</Box>
						))}
						<Box sx={{ width: "24%" }}>
							<LoadingButton
								type="submit"
								text="Sauvegarder"
								loadingPosition="start"
								fullWidth
								startIcon={<Save />}
								loading={loadingBtn}
							/>
						</Box>
					</Box>
				</Box>
				<Toaster
					position="top-center"
					richColors
					toastOptions={{
						style: {
							background: "#045D5D",
							color: "#fff",
						},
						className: "class",
					}}
				/>
			</form>
			<AddProductExcel />
		</Box>
	);
};

export default AddProductForm;
