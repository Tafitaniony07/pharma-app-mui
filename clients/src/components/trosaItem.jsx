import { Add, ArrowRightTwoTone, Delete, Edit, ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, ListItemText, Stack, Typography, Menu, MenuItem, Fab } from "@mui/material";
import { useState } from "react";
import AddTrosaDialog from "./dialog/addTrosaDialog.jsx";
import EditTrosaDialog from "./dialog/editTrosaDialog.jsx";
import { Toaster, toast } from "sonner";
import DeleteDialog from "./dialog/deleteDialog.jsx";

const TrosaItem = () => {
	const [open, setOpen] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const handleOpenDialog = () => {
		setOpen(true);
	};
	const handleCloseDialog = () => {
		setOpen(false);
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
	};
	const [listTrosa, setListTrosa] = useState([
		{
			id: 1,
			fournisseur: "John Doe",
			date_trosa: "12-08-24",
			total: 15000,
			state: "payé",
			bgcolor: "#045D5D",
			border: "none",
			color: "#fff",
		},
		{
			id: 2,
			fournisseur: "Jensen Walker",
			date_trosa: "02-11-24",
			total: 80000,
			state: "en cours",
			bgcolor: "#fff",
			color: "orange",
			border: "1px solid orange",
		},
		{
			id: 3,
			fournisseur: "Mike Tyson",
			date_trosa: "05-09-24",
			total: 75000,
			state: "payé",
			bgcolor: "#045D5D",
			border: "none",
			color: "#fff",
		},
		{
			id: 4,
			fournisseur: "Paul Dayron",
			date_trosa: "12-03-23",
			total: 330000,
			state: "en cours",
			bgcolor: "#fff",
			color: "orange",
			border: "1px solid orange",
		},
		{
			id: 5,
			fournisseur: "John Doe",
			date_trosa: "12-08-24",
			total: 15000,
			state: "payé",
			bgcolor: "#045D5D",
			color: "#fff",
			border: "none",
		},
		{
			id: 6,
			fournisseur: "Paul Dayron",
			date_trosa: "12-03-23",
			total: 330000,
			state: "en cours",
			bgcolor: "#fff",
			color: "orange",
			border: "1px solid orange",
		},
	]);

	const [filterState, setFilterState] = useState("");
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleEditTrosa = (item) => {
		setSelectedItem(item);
		console.log(item);
		setOpenEditDialog(true);
	};
	const handleDeleteTrosa = (item) => {
		setSelectedItem(item);
		setOpenDeleteDialog(true);
	};
	const deleteTrosa = (item) => {
		setListTrosa((prevList) => prevList.filter((trosa) => trosa.id !== item.id));
		handleCloseDialog();
		toast.success("La trosa a été supprimée avec succès !");
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleFilterChange = (state) => {
		setFilterState(state);
		handleClose();
	};

	const filteredItem = filterState ? listTrosa.filter((item) => item.state === filterState) : listTrosa;

	return (
		<>
			<Stack spacing={3} direction="row" alignItems="center" justifyContent="space-between">
				<Typography component="h2" sx={{ fontSize: "25px" }} color="secondary">
					Tous les Trosa
					<Typography component="p" color="black">
						Il y a {filteredItem.length} total de trosa
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
						<MenuItem onClick={() => handleFilterChange("en cours")}>En cours</MenuItem>
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
			{filteredItem.map((item) => (
				<Box
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					key={item.id}
					p={2}
					sx={{
						background: "#045D5D08",
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
					<Stack spacing={3} direction="row" alignItems="center">
						<Typography component="h5" color="secondary">
							#
							<Typography component="span" color="black">
								{item.id}
							</Typography>
						</Typography>
						<Typography component="div" bgcolor="white" px={3} py={0.5} borderRadius={10}>
							Date {item.date_trosa}
						</Typography>
						<Typography component="h4">{item.fournisseur}</Typography>
					</Stack>
					<Stack spacing={5} direction="row" alignItems="center">
						<Typography component="h4" color="black">
							{item.state === "payé" ? "Total" : "Montant Restant"}:
							<Typography component="span" color="secondary">
								{item.total} Ar
							</Typography>
						</Typography>
						<Button
							sx={{
								borderRadius: "50px",
								background: `${item.bgcolor}`,
								color: `${item.color}`,
								textTransform: "capitalize",
								px: 3,
								"&:hover": {
									background: "white",
									color: "secondary.main",
								},
							}}
							endIcon={<ArrowRightTwoTone />}
						>
							{item.state}
						</Button>
						{item.state === "payé" ? (
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
