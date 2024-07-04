/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Grid, TextField, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { DeleteProduct, UpdateProduct, createStock, stock, stockInExpired } from "../../api/product.js";
import ViewProductDialog from "../../components/dialog/viewProductDialog.jsx";
import EditProductDialog from "../../components/dialog/editProductDialog.jsx";
import ProductTable from "./productTable.jsx";
import Button from "../../components/btn/MuiButton.jsx";
import useSortDataTable from "../../components/sortDataTable.js";
import { useForm } from "react-hook-form";
import DeleteDialog from "../../components/dialog/deleteDialog.jsx";

const AdminListProducts = () => {
	const navigate = useNavigate();
	const [filterText, setFilterText] = useState("");
	const [stockData, setStockData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [openViewDialog, setOpenViewDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [itemToDelete, setItemToDelete] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: "onTouched",
	});

	useEffect(() => {
		const fetch = async () => {
			const res = await stock();
			setStockData(() =>
				res.data.filter((item) =>
					item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())
				)
			);
		};
		fetch();
	}, [filterText]);

	useEffect(() => {
		const deleteItem = async () => {
			if (itemToDelete) {
				try {
					await DeleteProduct(itemToDelete.pk);
					setStockData((prevData) => prevData.filter((data) => data !== itemToDelete));
					setOpenDeleteDialog(false);
				} catch (error) {
					console.error("Error deleting item:", error);
				} finally {
					setItemToDelete(null);
				}
			}
		};

		deleteItem();
	}, [itemToDelete]);

	const {
		sortedData,
		sortColumn,
		sortDirection,
		page,
		rowsPerPage,
		handleSort,
		handleChangePage,
		handleChangeRowsPerPage,
		setSortData,
	} = useSortDataTable(stockData);

	const handleView = (item) => {
		setSelectedItem(item);
		setOpenViewDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenViewDialog(false);
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
	};

	const handleEdit = (item) => {
		setSelectedItem(item);
		setOpenEditDialog(true);
	};

	const handleDeleteProduct = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};

	const handleDelete = () => {
		setItemToDelete(selectedItem);
	};

	const handleProductUpdated = (updatedProduct) => {
		setStockData((prevData) => prevData.map((item) => (item.pk === updatedProduct.pk ? updatedProduct : item)));
	};

	const onSubmitEdit = async (data) => {
		data.pk = selectedItem.pk;
		const datas = await UpdateProduct(selectedItem.pk, data);
		const updatedStockData = stockData.map((item) =>
			item.detail_product.designation === selectedItem.detail_product.designation ? { ...item, ...data } : item
		);
		setStockData(updatedStockData);
		reset();
	};

	const columns = [
		{ filter: "famille", label: "Famille" },
		{ filter: "designation", label: "Désignation" },
		{ filter: "classe", label: "Classe" },
		{ filter: "marque_product", label: "Marque" },
		{ filter: "prix_uniter", label: "P.U" },
		{ filter: "prix_gros", label: "P.G" },
		{ filter: "qte_gros", label: "Quantité" },
		{ filter: "date_peremption", label: "Date " },
	];

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
				data={stockData}
				columns={columns}
				sortColumn={sortColumn}
				sortDirection={sortDirection}
				handleSort={handleSort}
				handleChangePage={handleChangePage}
				handleChangeRowsPerPage={handleChangeRowsPerPage}
				handleView={handleView}
				handleEdit={handleEdit}
				handleDelete={handleDeleteProduct}
				page={page}
				rowsPerPage={rowsPerPage}
			/>
			<ViewProductDialog open={openViewDialog} onClose={handleCloseDialog} selectedItem={selectedItem} />
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleCloseDialog}
				selectedItem={selectedItem}
				deleteItem={handleDelete}
			/>
			<EditProductDialog
				open={openEditDialog}
				onClose={handleCloseDialog}
				selectedItem={selectedItem}
				onSubmitEdit={onSubmitEdit}
				onProductUpdated={handleProductUpdated}
			/>
		</>
	);
};

export default AdminListProducts;
