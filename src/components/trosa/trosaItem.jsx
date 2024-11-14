import {
	Add,
	CalendarMonthOutlined,
	Delete,
	Edit,
	ExpandLess,
	ExpandMore,
	PaymentOutlined,
	PersonOutlineOutlined,
	PhoneOutlined,
	PlaceOutlined,
} from "@mui/icons-material";
import { Box, Button, Fab, ListItemText, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { create } from "zustand";
import { DeleteTrosa, ListTrosa } from "../../api/trosa.js";
import { formatDate } from "../../functions/formatDate.js";
import useAuth from "../../hooks/useAuth.js";
import AddTrosaDialog from "../modal/addTrosaDialog.jsx";
import DeleteDialog from "../modal/deleteDialog.jsx";
import EditTrosaDialog from "../modal/editTrosaDialog.jsx";

// Store Zustand pour gérer le rafraîchissement de la liste des trosas
export const useRefreshTrosa = create((set) => ({
	isRefresh: false,
	setRefreshTrosa: () => set((state) => ({ isRefresh: !state.isRefresh })),
}));

const TrosaItem = () => {
	// Récupération des informations du compte connecté
	const { account } = useAuth();
	// État du rafraîchissement depuis le store
	const { isRefresh } = useRefreshTrosa();
	// États pour gérer l'ouverture/fermeture des différentes modales
	const [open, setOpen] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	// État pour stocker l'élément sélectionné pour édition/suppression
	const [selectedItem, setSelectedItem] = useState(null);
	// Styles pour les différents états de paiement
	const status = {
		payer: {
			bgcolor: "#045D5D",
			border: "none",
			color: "#fff",
		},
		noPayer: {
			bgcolor: "rgba(250, 178, 50, 0.105) ",
			color: "#000",
			border: "1px solid rgba(250, 178, 50, 0.5)",
		},
	};
	// État pour stocker la liste des trosas
	const [listTrosa, setListTrosa] = useState([]);
	// État pour le filtre actif
	const [filterState, setFilterState] = useState("");
	// État pour gérer le menu de filtrage
	const [anchorEl, setAnchorEl] = useState(null);

	// Effet pour charger la liste des trosas au montage et lors des rafraîchissements
	useEffect(() => {
		try {
			const fetch = async () => {
				const res = await ListTrosa();
				console.log(res.data, isRefresh);
				setListTrosa(res.data);
			};
			fetch();
		} catch (error) {
			console.log(error);
			throw error;
		}
	}, [isRefresh]);

	// Gestionnaires pour l'ouverture/fermeture des modales
	const handleOpenDialog = () => {
		setOpen(true);
	};
	const handleCloseDialog = () => {
		setOpen(false);
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
	};

	// Gestionnaires pour le menu de filtrage
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	// Gestionnaire pour l'édition d'un trosa
	const handleEditTrosa = (item) => {
		setSelectedItem(item);
		setOpenEditDialog(true);
	};

	// Gestionnaire pour la suppression d'un trosa
	const handleDeleteTrosa = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};

	// Fonction pour supprimer un trosa
	// Fonction asynchrone pour supprimer un trosa de la base de données
	const deleteTrosa = async (item) => {
		try {
			// Appel à l'API pour supprimer le trosa avec l'ID spécifié
			const res = await DeleteTrosa(item.pk);
			// Log du statut de la réponse pour le débogage
			console.log(res.status);
		} catch (error) {
			// En cas d'erreur, on log l'erreur et on la propage
			console.log(error);
			throw error;
		}
		// Mise à jour de la liste après suppression
		setListTrosa((prevList) => prevList.filter((trosa) => trosa.pk !== item.pk));
		handleCloseDialog();
		toast.success("La trosa a été supprimée avec succès !");
	};

	// Fermeture du menu de filtrage
	const handleClose = () => {
		setAnchorEl(null);
	};

	// Application du filtre sélectionné
	const handleFilterChange = (state) => {
		setFilterState(state);
		handleClose();
	};

	// Fonction mémorisée pour filtrer les items selon le critère sélectionné
	const filteredItem = useCallback(() => {
		let retour = [];
		switch (filterState) {
			case "payé":
				retour = listTrosa.filter((item) => parseInt(item.montant_restant) === 0);
				break;
			case "non payé":
				retour = listTrosa.filter((item) => parseInt(item.montant_restant) !== 0);
				break;
			default:
				retour = listTrosa;
				break;
		}
		return retour;
	}, [filterState, listTrosa]);

	return (
		<>
			<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
				<Typography component="h2" sx={{ fontSize: "25px" }} color="secondary">
					Tous les Trosa
					<Typography component="p" color="black">
						Il y a {filteredItem().length} total de trosa
					</Typography>
				</Typography>
				<Box>
					<Button
						aria-controls="filter-menu"
						aria-haspopup="true"
						variant="outlined"
						onClick={handleClick}
						sx={{
							minHeight: 48,
							justifyContent: "initial",
							color: "secondary.main",
							px: 5,
							borderRadius: "50px",
						}}
						endIcon={anchorEl ? <ExpandLess /> : <ExpandMore />}
					>
						<ListItemText primary="Filtrer par" sx={{ textTransform: "capitalize" }} />
					</Button>
					<Menu
						id="filter-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
						sx={{
							"& .MuiPaper-root": {
								boxShadow: "none",
							},
						}}
					>
						<MenuItem sx={{ width: 175 }} onClick={() => handleFilterChange("payé")}>
							Payé
						</MenuItem>
						<MenuItem onClick={() => handleFilterChange("non payé")}>Non payé</MenuItem>
						<MenuItem onClick={() => handleFilterChange("")}>Tout</MenuItem>
					</Menu>
				</Box>
				<Button
					onClick={handleOpenDialog}
					sx={{
						borderRadius: "50px",
						bgcolor: "#f9f9f9",
						textTransform: "capitalize",
						fontSize: "17px",
						p: "8px 25px",
					}}
					startIcon={<Add />}
				>
					Ajouter un nouveau trosa
				</Button>
			</Stack>
			<Box
				sx={{
					maxHeight: "66vh", // Définir une hauteur maximale
					overflowY: "auto", // Définir une hauteur maximale
				}}
			>
				{filteredItem().map((item, i) => (
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						key={i}
						p={2}
						sx={{
							background: "#045D5D03",
							borderRadius: 3,
							border: "1px solid transparent",
							transition: "transform 0.8s ease, border-color 0.8s ease",
							"&:hover": {
								transform: "scale(0.99)", // Légère mise à l'échelle
								borderColor: "secondary.main", // Couleur de la bordure lors du survol
								cursor: "pointer",
							},
						}}
						my={2}
					>
						<Stack spacing={5} direction="row" alignItems="center">
							<Typography component="h5" color="secondary">
								#
								<Typography component="span" color="black">
									{i + 1}
								</Typography>
							</Typography>
							<Stack direction="row" spacing={1} alignItems="center">
								<CalendarMonthOutlined fontSize="small" />
								<Typography variant="body1">{formatDate(item.date)}</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<PersonOutlineOutlined fontSize="small" />
								<Typography variant="body1">{item.owner}</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<PhoneOutlined fontSize="small" />
								<Typography variant="body1">{item.contact}</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<PlaceOutlined fontSize="small" />
								<Typography variant="body1">{item.adress}</Typography>
							</Stack>
							<Stack direction="row" spacing={1} alignItems="center">
								<PaymentOutlined fontSize="small" />
								<Typography component="h4" color="black" minWidth={150}>
									{parseInt(item.montant_restant) === 0 ? "Total" : "Restant"}:
									<Typography
										component="span"
										sx={{
											color: ` ${parseInt(item.montant_restant) === 0 ? "#045D5D" : "#f00"}`,
										}}
									>
										{parseInt(item.montant_restant) === 0 ? item.montant : item.montant_restant}
										Ar
									</Typography>
								</Typography>
							</Stack>
						</Stack>
						<Stack spacing={5} direction="row" alignItems="center">
							<Button
								sx={{
									borderRadius: "50px",
									background: `${
										parseInt(item.montant_restant) === 0
											? status.payer.bgcolor
											: status.noPayer.bgcolor
									}`,
									color: `${
										parseInt(item.montant_restant) === 0 ? status.payer.color : status.noPayer.color
									}`,
									border: `${
										parseInt(item.montant_restant) === 0
											? status.payer.border
											: status.noPayer.border
									}`,
									textTransform: "capitalize",
									px: 3,
									"&:hover": {
										background: "white",
										color: "secondary.main",
									},
								}}
							>
								{parseInt(item.montant_restant) === 0 ? "payé" : "non payé"}
							</Button>
							{account.account_type === "proprios" ? null : parseInt(item.montant_restant) === 0 ? (
								<Fab
									size="small"
									aria-label="delete"
									onClick={() => handleDeleteTrosa(item)}
									sx={{
										background: "rgba(255, 0, 0, 0.105)",
										boxShadow: "0",
										border: "1px solid rgba(255, 0, 0, 0.145)",
										"&:hover": {
											background: "rgba(255, 0, 0, 0.245)",
											color: "red",
										},
									}}
								>
									<Delete />
								</Fab>
							) : (
								<Fab
									size="small"
									aria-label="edit"
									onClick={() => handleEditTrosa(item)}
									sx={{
										background: "rgba(0, 128, 0, 0.105)",
										boxShadow: "0",
										border: "1px solid rgba(0, 128, 0, 0.145)",
									}}
								>
									<Edit />
								</Fab>
							)}
						</Stack>
					</Box>
				))}
			</Box>

			<AddTrosaDialog open={open} onClose={handleCloseDialog} />
			<EditTrosaDialog open={openEditDialog} onClose={handleCloseDialog} selectedItem={selectedItem} />
			<DeleteDialog
				open={openDeleteDialog}
				onClose={handleCloseDialog}
				deleteItem={deleteTrosa}
				selectedItem={selectedItem}
			/>
			<Toaster position="top-center" richColors />
		</>
	);
};

export default TrosaItem;
