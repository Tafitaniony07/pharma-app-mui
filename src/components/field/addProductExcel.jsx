import { Save, UploadFile } from "@mui/icons-material";
import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import Button from "../btn/MuiButton.jsx";
import * as XLSX from "xlsx";
import { addDays } from "date-fns";
import { useState } from "react";
import { createStock } from "../../api/product.js";
import LoadingButton from "../btn/MuiLoadingButton.jsx";

const AddProductExcel = () => {
  const [stockData, setStockData] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
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
      const formattedData = jsonData
        .map((item) => {
          console.log(
            typeof item.type_unite === "string" + " " + item.type_unite
          );
          if (
            typeof item.date_peremption === "number" &&
            typeof item.type_unite === "string" &&
            typeof item.marque === "string" &&
            typeof item.designation === "string" &&
            typeof item.type_gros === "string"
          ) {
            const date_peremption = addDays(
              new Date(1900, 0, 1),
              item.date_peremption - 2
            );
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
          } else return null;
        })
        .filter((item) => item !== null);
      // formattedData['802'].type_unite
      setStockData(formattedData);
      console.log(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const OnSubmitExcel = async () => {
    setLoadingBtn(true);
    try {
      setTimeout(async () => {
        console.log(stockData.length);
        if (stockData.length <= 0) {
          setLoadingBtn(false)
          throw new Error("No data");
        }
        const res = await createStock(stockData)
        if (res.status == 200 || res.status == 201) setLoadingBtn(false)
      }, 1000);
    } catch (error) {
      setLoadingBtn(false)
      throw error;
    }
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
    </Box>
  );
};

export default AddProductExcel;
