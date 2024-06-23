import { useState } from "react";
import {
	Grid,
	TextField,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	InputAdornment,
	TableFooter,
	TablePagination,
	Fab,
	DialogTitle,
	DialogContent,
	DialogActions,
	Dialog,
	Stack,
	Button,
	Typography,
} from "@mui/material";
import { format, addMonths, isBefore } from "date-fns";
import SearchIcon from "@mui/icons-material/Search";
import { Add, Close, Delete, Edit, Save, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Medicaments } from "../../data/listmedicaments.jsx";

const AdminListProducts = () => {
	const [filterText, setFilterText] = useState("");
	const [sortColumn, setSortColumn] = useState("designation");
	const [sortDirection, setSortDirection] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [stockData, setStockData] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openEditDialog, setOpenEditDialog] = useState(false);

	const filteredData = Medicaments.filter((item) =>
		item.designation.toLowerCase().includes(filterText.toLowerCase())
	);

	const sortedData = filteredData.sort((a, b) => {
		if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
		if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
		return 0;
	});

	const handleSort = (column) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	const handleView = (item) => {
		setSelectedItem(item);
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
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

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		mode: "onTouched",
	});

	const onSubmitEdit = (data) => {
		const updatedStockData = stockData.map((item) =>
			item.designation === selectedItem.designation ? { ...item, ...data } : item
		);
		setStockData(updatedStockData);
		handleCloseEditDialog();
		reset();
	};

	const isExpiringSoon = (date_peremption) => {
		const today = new Date();
		const threeMonthsLater = addMonths(today, 3);
		return isBefore(date_peremption, threeMonthsLater);
	};
	const columns = [
		{ filter: "family", label: "Famille" },
		{ filter: "designation", label: "Designation" },
		{ filter: "classe", label: "Classe" },
		{ filter: "marque", label: "Marque" },
		{ filter: "price_uniter", label: "Prix U" },
		{ filter: "price_gros", label: "Prix G" },
		{ filter: "quantity", label: "Quantité" },
		{ filter: "date_peremption", label: "Date " },
	];

	return (
		<Grid container spacing={3}>
			<Grid item xs={9}>
				<TextField
					label="Rechercher..."
					value={filterText}
					onChange={(e) => setFilterText(e.target.value)}
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon color="primary" />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid item xs={3}>
				<Button
					type="submit"
					onClick={() => navigate("/addproduct")}
					sx={{
						p: 1.5,
						textTransform: "capitalize",
						backgroundColor: "secondary.main",
						fontFamily: "Exo2-Medium",
						fontSize: "18px",
						color: "#fff",
						"&:hover": {
							backgroundColor: "secondary.main",
						},
						"&:active": {
							backgroundColor: "secondary.main",
							borderColor: "secondary.main",
						},
					}}
					size="medium"
					variant="contained"
					disableElevation
					fullWidth
					startIcon={<Add />}
				>
					Nouveau produit
				</Button>
			</Grid>

			<Grid item xs={12}>
				<TableContainer>
					<Table stickyHeader>
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell key={column.filter}>
										<TableSortLabel
											active={sortColumn === `${column.filter}`}
											direction={sortDirection}
											onClick={() => handleSort(`${column.filter}`)}
										>
											{column.label}
										</TableSortLabel>
									</TableCell>
								))}
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{paginatedData.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.family}</TableCell>
									<TableCell>{item.designation}</TableCell>
									<TableCell>{item.classe}</TableCell>
									<TableCell>{item.marque}</TableCell>
									<TableCell>{item.price_uniter} Ar</TableCell>
									<TableCell>{item.price_gros} Ar</TableCell>
									<TableCell>{item.quantity} (bte)</TableCell>
									<TableCell>
										<Typography
											component="div"
											sx={{
												color: isExpiringSoon(item.date_peremption) ? "red" : "inherit",
												backgroundColor: isExpiringSoon(item.date_peremption)
													? "rgba(255, 0, 0, 0.145)"
													: "inherit",
												display: "inline-block",
												p: "3px 13px",
												borderRadius: "50px",
												fontSize: "14px",
											}}
										>
											{format(item.date_peremption, "dd/MM/yyyy")}
										</Typography>
									</TableCell>
									<TableCell>
										<Stack direction="row" gap={1}>
											<Fab
												size="small"
												aria-label="view"
												sx={{
													background: "rgba(58, 0, 128, 0.055)",
													boxShadow: "0",
												}}
												onClick={() => handleView(item)}
											>
												<Visibility />
											</Fab>
											<Fab
												size="small"
												aria-label="edit"
												sx={{
													background: "rgba(0, 128, 0, 0.105)",
													boxShadow: "0",
													border: "1px solid rgba(0, 128, 0, 0.145)",
												}}
												onClick={() => handleEdit(item)}
											>
												<Edit />
											</Fab>
											<Fab
												size="small"
												aria-label="delete"
												sx={{
													background: "rgba(255, 0, 0, 0.105)",
													boxShadow: "0",
													border: "1px solid rgba(255, 0, 0, 0.145)",
													"&:hover": {
														background: "rgba(255, 0, 0, 0.245)",
														color: "red",
													},
												}}
												onClick={() => handleDelete(item)}
											>
												<Delete />
											</Fab>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>

						<TableFooter>
							<TableRow mt={10}>
								<TablePagination
									rowsPerPageOptions={[5, 10, 25]}
									colSpan={12}
									count={filteredData.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onPageChange={handleChangePage}
									onRowsPerPageChange={handleChangeRowsPerPage}
									labelRowsPerPage="Lignes par page"
									labelDisplayedRows={({ from, to, count }) => `${from}-${to} sur ${count}`}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</TableContainer>
			</Grid>

			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Voir le produit</DialogTitle>
				<DialogContent>
					{selectedItem && (
						<>
							<Typography>Nom: {selectedItem.family}</Typography>
							<Typography>Nom: {selectedItem.classe}</Typography>
							<Typography>Nom: {selectedItem.designation}</Typography>
							<Typography>Nom: {selectedItem.maque}</Typography>
							<Typography>
								Date de péremption: {format(selectedItem.date_peremption, "dd/MM/yyyy")}
							</Typography>
							<Typography>Prix: {selectedItem.price_uniter} Ar</Typography>
							<Typography>Prix: {selectedItem.price_gros} Ar</Typography>
							<Typography>Quantité: {selectedItem.quantity}</Typography>
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog}>Fermer</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
				<DialogTitle>Modifier le produit</DialogTitle>
				<form onSubmit={handleSubmit(onSubmitEdit)}>
					<DialogContent>
						{selectedItem && (
							<>
								<TextField
									label="Nom"
									defaultValue={selectedItem.designation}
									{...register("designation", { required: "Ce champ est requis" })}
									error={!!errors.designation}
									helperText={errors.designation?.message}
									fullWidth
									margin="dense"
								/>
								<TextField
									label="Quantité"
									type="number"
									defaultValue={selectedItem.quantity}
									{...register("quantity", { required: "Ce champ est requis" })}
									error={!!errors.quantity}
									helperText={errors.quantity?.message}
									fullWidth
									margin="dense"
								/>
								<TextField
									label="Date de péremption"
									type="date"
									defaultValue={format(selectedItem.date_peremption, "yyyy-MM-dd")}
									{...register("date_peremption", { required: "Ce champ est requis" })}
									error={!!errors.date_peremption}
									helperText={errors.expiryDate?.message}
									fullWidth
									margin="dense"
								/>
								<TextField
									label="Prix"
									type="number"
									defaultValue={selectedItem.price_gros}
									{...register("price_gros", { required: "Ce champ est requis" })}
									error={!!errors.price_gros}
									helperText={errors.price_gros?.message}
									fullWidth
									margin="dense"
								/>
							</>
						)}
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleCloseEditDialog}
							sx={{
								p: 1,
								textTransform: "capitalize",
								backgroundColor: "rgba(255, 0, 0, 0.845)",
								fontFamily: "Exo2-Medium",
								fontSize: "18px",
								color: "#fff",
								"&:hover": {
									backgroundColor: "rgba(255, 0, 0, 0.745)",
								},
								"&:active": {
									backgroundColor: "rgba(255, 0, 0, 0.745)",
									borderColor: "rgba(255, 0, 0, 0.745)",
								},
							}}
							size="medium"
							variant="contained"
							disableElevation
							fullWidth
							startIcon={<Close />}
						>
							Annuler
						</Button>
						<Button
							onClick={handleCloseEditDialog}
							sx={{
								p: 1,
								textTransform: "capitalize",
								backgroundColor: "secondary.main",
								fontFamily: "Exo2-Medium",
								fontSize: "18px",
								color: "#fff",
								"&:hover": {
									backgroundColor: "secondary.main",
								},
								"&:active": {
									backgroundColor: "secondary.main",
									borderColor: "secondary.main",
								},
							}}
							size="medium"
							variant="contained"
							disableElevation
							fullWidth
							startIcon={<Save />}
						>
							Enregistrer
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</Grid>
	);
};

export default AdminListProducts;
