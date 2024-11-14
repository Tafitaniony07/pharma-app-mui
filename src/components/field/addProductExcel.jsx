import { Save, UploadFile } from "@mui/icons-material";
import {
	Box,
	Dialog,
	DialogContent,
	DialogTitle,
	InputAdornment,
	LinearProgress,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material";
import { addDays } from "date-fns";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import * as XLSX from "xlsx";
import { createStock } from "../../api/product.js";
import LoadingButton from "../btn/MuiLoadingButton.jsx";

/**
 * Composant permettant d'ajouter des produits via un fichier Excel
 * Gère le téléchargement, la validation et l'enregistrement des données
 */
const AddProductExcel = () => {
	const [stockData, setStockData] = useState([]);
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [openDialog, setOpenDialog] = useState(false);
	const [uploadErrors, setUploadErrors] = useState([]);
	const [progressCount, setProgressCount] = useState(0);

	const { reset } = useForm({
		mode: "onTouched",
	});

	/**
	 * Gère le téléchargement et la lecture du fichier Excel
	 * Convertit les données en format JSON et les valide
	 * @param {Event} event - L'événement de changement de fichier
	 */
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });

			const formattedData = jsonData
				.map((item) => {
					if (item.date_peremption && item.marque && item.designation && item.fournisseur) {
						const date_peremption = addDays(new Date(1900, 0, 1), item.date_peremption - 2);
						return {
							marque: item.marque,
							qte_uniter: item.qte_uniter,
							qte_gros: item.qte_gros,
							prix_uniter: item.prix_uniter,
							prix_gros: item.prix_gros,
							detail: {
								famille: item.famille,
								designation: item.designation,
								classe: item.classe,
								type_uniter: item.type_unite,
								type_gros: item.type_gros,
								qte_max: item.qte_max,
							},
							fournisseur: {
								nom: item.fournisseur,
								contact: item.contact,
								adress: item.adress,
							},
							date_peremption: date_peremption.toISOString().split("T")[0],
						};
					} else {
						setUploadErrors((prevErrors) => [...prevErrors, item]);
						return null;
					}
				})
				.filter((item) => item !== null);

			setStockData(formattedData);
		};
		reader.readAsArrayBuffer(file);
	};

	/**
	 * Gère la soumission des données Excel vers l'API
	 * Affiche une barre de progression et gère les erreurs
	 */
	const OnSubmitExcel = async () => {
		setLoadingBtn(true);
		setOpenDialog(true);
		setUploadErrors([]);
		setProgressCount(0);

		try {
			if (stockData.length <= 0) {
				throw new Error("No data");
			}

			for (let i = 0; i < stockData.length; i++) {
				await createStock([stockData[i]]);
				setProgressCount(i + 1); // Met à jour le compteur de progression
			}

			setLoadingBtn(false);
			setOpenDialog(false);
			reset(); // Reset tous les champs du formulaire avec react-hook-form
			toast.success("Ajout des produits réussi !");
		} catch (error) {
			setLoadingBtn(false);
			setOpenDialog(false);
			toast.error("Échec de l'ajout des produits");
		}
	};

	return (
		<Box p={5} sx={{ display: "flex", flexDirection: "column", gap: 3, bgcolor: "white", borderRadius: 5 }}>
			<Typography fontWeight={700} color="secondary.main">
				Ajouter des produits via un fichier Excel
			</Typography>
			<Box sx={{ display: "flex", gap: 2 }}>
				<Box sx={{ width: "75%" }}>
					<TextField
						fullWidth
						type="file"
						onChange={handleFileUpload}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<UploadFile />
								</InputAdornment>
							),
						}}
						label="Télécharger le fichier Excel"
						InputLabelProps={{ shrink: true }}
					/>
				</Box>
				<Box sx={{ width: "25%" }}>
					<LoadingButton
						onClick={OnSubmitExcel}
						text="Sauvegarder"
						fullWidth
						loading={loadingBtn}
						startIcon={<Save />}
						color="secondary"
					/>
				</Box>
			</Box>

			{/* Dialog de chargement */}
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>Chargement des produits...</DialogTitle>
				<DialogContent>
					<LinearProgress variant="determinate" value={(progressCount / stockData.length) * 100} />
					<Typography variant="body2" mt={2}>
						{progressCount} sur {stockData.length} produits ajoutés
					</Typography>
					{uploadErrors.length > 0 && (
						<>
							<Typography variant="subtitle1" color="error" mt={2}>
								Erreurs de chargement :
							</Typography>
							<List>
								{uploadErrors.map((error, index) => (
									<ListItem key={index}>
										<ListItemText
											primary={`Erreur pour ${
												error.designation || "produit"
											} : informations manquantes`}
										/>
									</ListItem>
								))}
							</List>
						</>
					)}
				</DialogContent>
			</Dialog>

			<Toaster
				position="top-center"
				richColors
				toastOptions={{ style: { background: "#045D5D", color: "#fff" } }}
			/>
		</Box>
	);
};

export default AddProductExcel;
