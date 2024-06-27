import { useState } from "react";
import { Grid, TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { Medicaments } from "../../data/listmedicaments.jsx";

import ViewProductDialog from "../../components/viewProductDialog.jsx";
import EditProductDialog from "../../components/editProductDialog.jsx";
import ProductTable from "../../components/productTable.jsx";
import Button from "../../components/btn/MuiButton.jsx";
import useSortDataTable from "../../components/sortDataTable.js";

const AdminListProducts = () => {
	const navigate = useNavigate();
	const [filterText, setFilterText] = useState("");
	const [stockData, setStockData] = useState(Medicaments);
	const [selectedItem, setSelectedItem] = useState(null);
	const [openViewDialog, setOpenViewDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);

	const filteredData = Medicaments.filter((item) =>
		item.designation.toLowerCase().includes(filterText.toLowerCase())
	);
	const {
		sortedData: paginatedData,
		sortColumn,
		sortDirection,
		page,
		rowsPerPage,
		handleSort,
		handleChangePage,
		handleChangeRowsPerPage,
	} = useSortDataTable(filteredData);

	const columns = [
		{ filter: "famille", label: "Famille" },
		{ filter: "designation", label: "Désignation" },
		{ filter: "classe", label: "Classe" },
		{ filter: "marque", label: "Marque" },
		{ filter: "prix_uniter", label: "P.U" },
		{ filter: "prix_gros", label: "P.G" },
		{ filter: "qte_gros", label: "Quantité" },
		{ filter: "date_peremption", label: "Date " },
	];
	const handleView = (item) => {
		setSelectedItem(item);
		setOpenViewDialog(true);
	};
	const handleCloseViewDialog = () => {
		setOpenViewDialog(false);
	};
	const handleEdit = (item) => {
		setSelectedItem(item);
		setOpenEditDialog(true);
	};
	const handleCloseEditDialog = () => {
		setOpenEditDialog(false);
	};
	const handleDelete = (item) => {
		setStockData(stockData.filter((data) => data !== item));
	};
	const onSubmitEdit = (data) => {
		const updatedStockData = stockData.map((item) =>
			item.designation === selectedItem.designation ? { ...item, ...data } : item
		);
		setStockData(updatedStockData);
		handleCloseEditDialog();
	};

	return (
		<>
			<Typography variant="h5" component="h1" mb={2}>
				Liste des produits
			</Typography>
			<Grid container spacing={2} alignItems="center" mb={2}>
				<Grid item xs={9}>
					<TextField
						label="Rechercher"
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
						text="Ajouter un produit"
						color="secondary"
						onClick={() => navigate("/addproduct")}
						startIcon={<Add />}
					/>
				</Grid>
			</Grid>
			<ProductTable
				data={paginatedData}
				columns={columns}
				sortColumn={sortColumn}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleView={handleView}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
			<ViewProductDialog open={openViewDialog} onClose={handleCloseViewDialog} selectedItem={selectedItem} />
			<EditProductDialog
				open={openEditDialog}
				onClose={handleCloseEditDialog}
				selectedItem={selectedItem}
				onSubmitEdit={onSubmitEdit}
			/>
		</>
	);
};

export default AdminListProducts;
