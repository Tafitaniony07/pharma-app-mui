import { Add, FileDownload } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as XLSX from "xlsx";
import Button from "../../../components/btn/MuiButton.jsx";
import DeleteDialog from "../../../components/modal/deleteDialog.jsx";
import EditProductDialog from "../../../components/modal/editProductDialog.jsx";
import ViewProductDialog from "../../../components/modal/viewProductDialog.jsx";
import { useListMedicaments } from "../../../contexts/useListMedicaments.js";
import { columns } from "../../../functions/columns.js";
import ProductTable from "./productTable.jsx";

const AdminListProducts = () => {
	const navigate = useNavigate();
	const { medicaments, setMedicaments, loading } = useListMedicaments();
	const [filterText, setFilterText] = useState("");
	const [selectedItem, setSelectedItem] = useState(null);
	const [openDialog, setOpenDialog] = useState({
		view: false,
		edit: false,
		delete: false,
	});

	// Filtrer les données
	const filteredData = medicaments.filter((item) =>
		item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())
	);

	const handleDialogOpen = (type, item) => {
		setSelectedItem(item);
		setOpenDialog((prev) => ({ ...prev, [type]: true }));
	};

	const handleDialogClose = () => {
		setOpenDialog({ view: false, edit: false, delete: false });
	};

	const handleProductUpdated = (updatedProduct) => {
		setMedicaments((prev) => prev.map((item) => (item.pk === updatedProduct.pk ? updatedProduct : item)));
	};

	const handleDeleteProduct = () => {
		setMedicaments((prev) => prev.filter((item) => item.pk !== selectedItem.pk));
		handleDialogClose();
	};

	const cleanDataForExport = (data) =>
		data.map(({ detail_product, ...rest }) => ({
			...rest,
			designation: detail_product.designation,
			famille: detail_product.famille,
			classe: detail_product.classe,
		}));

	const downloadExcel = () => {
		const today = new Date();
		const nameFile = `Medicaments-${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
		const cleanedData = cleanDataForExport(medicaments);
		const worksheet = XLSX.utils.json_to_sheet(cleanedData);
		const workBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workBook, worksheet, "Medicaments");
		XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
		XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
		XLSX.writeFile(workBook, nameFile + ".xlsx");
	};
	return (
		<>
			<Typography variant="h5" component="h1" mb={2}>
				Liste des produits
			</Typography>
			<Grid container spacing={2} alignItems="center" mb={2}>
				<Grid item xs={6}>
					<TextField
						label="Rechercher un médicament..."
						value={filterText}
						fullWidth
						onChange={(e) => setFilterText(e.target.value)}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={3}>
					<Button
						fullWidth
						text="Nouveau produit"
						color="secondary"
						onClick={() => navigate("/add_product")}
						startIcon={<Add />}
					/>
				</Grid>
				<Grid item xs={3}>
					<Button
						fullWidth
						text="Télécharger Excel"
						color="success"
						onClick={() => downloadExcel()}
						startIcon={<FileDownload />}
					/>
				</Grid>
			</Grid>
			<ProductTable
				data={filteredData}
				columns={columns}
				handleView={(item) => handleDialogOpen("view", item)}
				handleEdit={(item) => handleDialogOpen("edit", item)}
				handleDelete={(item) => handleDialogOpen("delete", item)}
				loading={loading}
			/>
			<ViewProductDialog open={openDialog.view} onClose={handleDialogClose} selectedItem={selectedItem} />
			<EditProductDialog
				open={openDialog.edit}
				onClose={handleDialogClose}
				selectedItem={selectedItem}
				onProductUpdated={handleProductUpdated}
			/>
			<DeleteDialog
				open={openDialog.delete}
				onClose={handleDialogClose}
				selectedItem={selectedItem}
				deleteItem={handleDeleteProduct}
			/>
		</>
	);
};

export default AdminListProducts;
