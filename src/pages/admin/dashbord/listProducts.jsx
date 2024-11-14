/* eslint-disable react-hooks/exhaustive-deps */
import { Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { DeleteProduct, stock } from "../../../api/product.js";
import Button from "../../../components/btn/MuiButton.jsx";
import DeleteDialog from "../../../components/modal/deleteDialog.jsx";
import EditProductDialog from "../../../components/modal/editProductDialog.jsx";
import ViewProductDialog from "../../../components/modal/viewProductDialog.jsx";
import { columns } from "../../../functions/columns.js";
import useAuth from "../../../hooks/useAuth.js";
import ProductTable from "./productTable.jsx";

const AdminListProducts = () => {
	// Récupère le type de compte de l'utilisateur connecté
	const { account_type } = useAuth().account;
	const navigate = useNavigate();
	// État pour stocker le texte de filtrage
	const [filterText, setFilterText] = useState("");
	// État pour stocker les données des produits
	const [stockData, setStockData] = useState([]);
	// État pour stocker l'élément sélectionné
	const [selectedItem, setSelectedItem] = useState(null);
	// États pour gérer l'ouverture/fermeture des dialogues
	const [openViewDialog, setOpenViewDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	// État pour stocker l'élément à supprimer
	const [itemToDelete, setItemToDelete] = useState(null);
	// État pour stocker les données initiales non filtrées
	const [initialData, setInitialData] = useState([]);
	const [loading, setLoading] = useState(true);

	const { reset } = useForm({
		mode: "onTouched",
	});

	// Chargement des données au montage du composant
	useEffect(() => {
		const fetchData = async () => {
			const res = await stock();
			setInitialData(res.data);
			setLoading(false);
		};
		fetchData();
	}, []);

	// Utilisation de `useMemo` pour filtrer les données sans recalculer à chaque rendu
	const filteredData = useMemo(() => {
		return initialData.filter((item) =>
			item.detail_product.designation.toLowerCase().includes(filterText.toLowerCase())
		);
	}, [filterText, initialData]);
	/**
	 * Effet qui gère la suppression d'un produit
	 * Met à jour la liste après suppression
	 */
	useEffect(() => {
		const deleteItem = async () => {
			if (itemToDelete) {
				try {
					await DeleteProduct(itemToDelete.pk);
					setStockData((prevData) => prevData.filter((data) => data !== itemToDelete));
					setOpenDeleteDialog(false);
				} catch (error) {
					console.error("Erreur lors de la suppression du produit :", error);
				} finally {
					setItemToDelete(null);
				}
			}
		};

		deleteItem();
	}, [itemToDelete]);

	/**
	 * Ouvre le dialogue de visualisation pour un produit
	 * @param {Object} item - Le produit à visualiser
	 */
	const handleView = (item) => {
		setSelectedItem(item);
		setOpenViewDialog(true);
	};

	/**
	 * Ferme tous les dialogues ouverts
	 */
	const handleCloseDialog = () => {
		setOpenViewDialog(false);
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
	};

	/**
	 * Ouvre le dialogue d'édition pour un produit
	 * @param {Object} item - Le produit à éditer
	 */
	const handleEdit = (item) => {
		setSelectedItem(item);
		setOpenEditDialog(true);
	};

	/**
	 * Ouvre le dialogue de confirmation de suppression
	 * @param {Object} item - Le produit à supprimer
	 */
	const handleDeleteProduct = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};

	/**
	 * Confirme la suppression d'un produit
	 */
	const handleDelete = () => {
		setItemToDelete(selectedItem);
	};

	/**
	 * Met à jour les données d'un produit dans la liste
	 * @param {Object} updatedProduct - Le produit mis à jour
	 */
	const handleProductUpdated = (updatedProduct) => {
		setStockData((prevData) => prevData.map((item) => (item.pk === updatedProduct.pk ? updatedProduct : item)));
	};

	/**
	 * Gère la soumission du formulaire d'édition
	 * @param {Object} data - Les nouvelles données du produit
	 */
	const onSubmitEdit = async (data) => {
		data.pk = selectedItem.pk;
		const updatedStockData = stockData.map((item) =>
			item.detail_product.designation === selectedItem.detail_product.designation ? { ...item, ...data } : item
		);
		setStockData(updatedStockData);
		reset();
	};

	return (
		<>
			<Typography variant="h5" component="h1" mb={2}>
				Liste des produits
			</Typography>
			<Grid container spacing={2} alignItems="center" mb={2}>
				<Grid item xs={9}>
					<TextField
						label="Rechercher un médicament..."
						placeholder="Entrez le nom du médicament"
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
				{account_type === "proprios" ? null : (
					<Grid item xs={3}>
						<Button
							fullWidth
							text="Ajout d’un produit"
							color="secondary"
							onClick={() => navigate("/add_product")}
							startIcon={<Add />}
						/>
					</Grid>
				)}
			</Grid>
			<ProductTable
				data={filteredData}
				columns={columns}
				handleView={handleView}
				handleEdit={handleEdit}
				handleDelete={handleDeleteProduct}
				loading={loading}
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
