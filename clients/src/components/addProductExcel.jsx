import { Save, UploadFile } from "@mui/icons-material";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import Button from "./btn/MuiButton.jsx";
import * as XLSX from "xlsx";
import { addDays } from "date-fns";
import { useState } from "react";

const AddProductExcel = () => {
	const [stockData, setStockData] = useState([]);

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

	const OnSubmitExcel = () => {
		console.log(stockData);
	};
	return (
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
			<Typography fontWeight={700} color="secondary.main">
				Insérer des produits (Excel)
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
					<Button onClick={OnSubmitExcel} text="Sauvegarder" fullWidth startIcon={<Save />} />
				</Box>
			</Box>
		</Box>
	);
};

export default AddProductExcel;
