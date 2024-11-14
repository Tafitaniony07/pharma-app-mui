/* eslint-disable react-hooks/exhaustive-deps */
import { Save } from "@mui/icons-material";
import { Autocomplete, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { ListFournisseur } from "../../api/fournisseur.js";
import { createProduct } from "../../api/product.js";
import LoadingButton from "../btn/MuiLoadingButton.jsx";
import AddProductExcel from "./addProductExcel.jsx";
import InputAddProduct from "./Input.jsx";
import FieldAddProduct from "./labelAddProduct.jsx";

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
	// État pour gérer le chargement du bouton
	const [loadingBtn, setLoadingBtn] = useState(false);
	// État pour stocker la liste des fournisseurs
	const [fournisseur, setSelectFournisseur] = useState([]);
	// État pour stocker le fournisseur sélectionné
	const [valuefounisseur, setValuefounisseur] = useState("");

	/**
	 * Gère la soumission du formulaire d'ajout de produit
	 * Crée un nouveau produit avec les données du formulaire
	 * @param {Object} data - Les données du formulaire
	 */
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

			// Appel à l'API pour créer un nouveau produit
			createProduct(datas)
				.then((response) => {
					// Vérifie si la création a réussi (status 201 Created)
					if (response.status === 201 || response.statusText === "Created") {
						setLoadingBtn(false);
						resetField();
						toast.success("Produit ajouté avec succès !");
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

	/**
	 * Effet qui met à jour les champs adresse et contact
	 * lorsqu'un fournisseur est sélectionné
	 */
	useEffect(() => {
		fournisseur.map((f) => {
			if (valuefounisseur === f.nom) {
				setValue("adresse", f.adress);
				setValue("contact", f.contact);
				setFocus("contact");
			}
		});
	}, [valuefounisseur]);

	/**
	 * Effet qui charge la liste des fournisseurs
	 * au chargement du composant
	 */
	useEffect(() => {
		try {
			ListFournisseur().then((res) => setSelectFournisseur(res.data));
		} catch (error) {
			console.error("Erreur lors de la récupération des fournisseurs :", error);
			throw error;
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
					<Typography>Insérer les données du produit</Typography>
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
