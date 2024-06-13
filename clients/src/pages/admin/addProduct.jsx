// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Stack, Typography, TextField, InputAdornment, MenuItem } from "@mui/material";
import SideBar from "../admin/adminSideBar.jsx";
import NavBar from "../../components/header.jsx";
import { Save, UploadFile } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import * as XLSX from "xlsx";
import { addDays } from "date-fns";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import Button from "../../components/btn/MuiButton.jsx";

const AddProduct = () => {
	const [stockData, setStockData] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onTouched",
	});
	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			const data = new Uint8Array(e.target.result);
			const workbook = XLSX.read(data, { type: "array" });
			const sheetName = workbook.SheetNames[0];
			const worksheet = workbook.Sheets[sheetName];
			const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
			// Convertir les valeurs de date en objets Date JavaScript
			const formattedData = jsonData.map((item) => {
				return {
					...item,
					expiryDate: addDays(new Date(1900, 0, 1), item.expiryDate - 2),
				};
			});
			setStockData(formattedData);
			console.log(formattedData);
		};
		reader.readAsArrayBuffer(file);
	};
	const getTodayDate = () => {
		const today = new Date();
		const yyyy = today.getFullYear();
		const mm = String(today.getMonth() + 1).padStart(2, "0"); // Mois avec deux chiffres
		const dd = String(today.getDate()).padStart(2, "0"); // Jour avec deux chiffres
		return `${yyyy}-${mm}-${dd}`;
	};

	const Familles = [
		{ value: "Medicaments", label: "Medicaments" },
		{ value: "Accessoires", label: "Accessoires" },
	];
	const items = [
		{ label: "Designation", name: "designation" },
		{
			label: "Famille",
			name: "famille",
			type: "select",
			defaultValue: "Medicaments",
			options: Familles,
		},
		{ label: "Classe", name: "classe" },
		{ label: "Type Uniter", name: "type_uniter" },
		{ label: "Type Gros", name: "type_gros" },
		{ label: "Marque", name: "marque" },
		{ label: "Prix Uniter", name: "prix_uniter" },
		{ label: "Prix Gros", name: "prix_gros" },
		{ label: "Quantité Uniter", name: "qte_uniter", type: "number", defaultValue: "1" },
		{ label: "Quantité Gros", name: "qte_gros", type: "number", defaultValue: "1" },
		{ label: "Fournisseur", name: "fournisseur" },
		{
			label: "Date de peremption",
			name: "date_peremption",
			type: "date",
			autoFocus: true,
			defaultValue: getTodayDate(),
		},
	];
	const OnSubmit = (data) => {
		console.log(data);
		toast.success("Product add success !!!");
	};
	const OnSubmitExcel = () => {
		console.log(stockData);
	};
	return (
		<Box mt={13} mb={10}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" gap={3} m="25px">
				<Box sx={{ bgcolor: "white", borderRadius: 5 }} flex={1}>
					<SideBar />
				</Box>
				<Box flex={4}>
					<form onSubmit={handleSubmit(OnSubmit)}>
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
							<Typography>Add New Product (Details)</Typography>

							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
								{items.map((field, index) => (
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

					<form onSubmit={handleSubmit(OnSubmitExcel)}>
						<Box
							mt={3}
							p={5}
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 3,
								bgcolor: "white",
								borderRadius: 5,
							}}
						>
							<Typography mb={1}>Add New Product (Excel)</Typography>
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
									<Button type="submit" text="Sauvegarder" fullWidth startIcon={<Save />} />
								</Box>
							</Box>
						</Box>
					</form>
				</Box>
			</Stack>
		</Box>
	);
};

export default AddProduct;
