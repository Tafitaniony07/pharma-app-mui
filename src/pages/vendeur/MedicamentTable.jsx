/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Fab,
	CircularProgress,
	Box,
	Stack,
	Skeleton,
} from "@mui/material";
import { ShoppingBasket, Visibility } from "@mui/icons-material";
import { TruncateText } from "../../components/TruncateText.jsx";
import { useState } from "react";
import ViewProductDialog from "../../components/dialog/viewProductDialog.jsx";
import useSortDataTable from "../../components/sortDataTable.js";
import { colVendeur } from "../../components/columns.js";
import PaginationTable from "../../components/paginationTable.jsx";

const MedicamentTable = ({ loadingState, addToCart, loading, Medicaments }) => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [openViewDialog, setOpenViewDialog] = useState(false);
	const { sortedData, sortColumn, sortDirection, handleSort } = useSortDataTable(Medicaments);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		setPage(0);
	};
	const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	const handleView = (item) => {
		setSelectedItem(item);
		setOpenViewDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenViewDialog(false);
	};

	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<TableContainer sx={{ maxHeight: "70vh", borderRadius: 3 }}>
				<Table stickyHeader aria-label="sticky header">
					<TableHead>
						<TableRow>
							{colVendeur.map((column) => (
								<TableCell key={column.filter} style={{ minWidth: column.minWidth }}>
									<TableSortLabel
										active={sortColumn === column.filter}
										direction={sortDirection}
										onClick={() => handleSort(column.filter)}
									>
										{column.label}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{loading
							? Array.from(new Array(25)).map(
									(
										_,
										index // 10 lignes de skeleton
									) => (
										<TableRow key={index}>
											{colVendeur.map((_, colIndex) => (
												<TableCell key={colIndex}>
													<Skeleton variant="rounded" height={30} />{" "}
													{/* Skeleton pour chaque cellule */}
												</TableCell>
											))}
										</TableRow>
									)
							  )
							: paginatedData.map((item, index) => (
									<TableRow key={index}>
										<TableCell>{TruncateText(item.detail_product.designation, 15)}</TableCell>
										<TableCell>{item.marque_product}</TableCell>
										<TableCell>
											{item.detail_product.classe === "comprimé" ||
											item.detail_product.classe === "Comprimé"
												? "cp"
												: item.detail_product.classe}
										</TableCell>
										<TableCell>
											{item.qte_gros} {}
											{item.detail_product.type_gros}
										</TableCell>
										<TableCell>{item.prix_uniter} Ar</TableCell>
										<TableCell>{item.prix_gros} Ar</TableCell>
										<TableCell style={{ whiteSpace: "nowrap" }}>
											<Stack direction="row" gap={2}>
												<Fab
													size="small"
													aria-label="view"
													onClick={() => handleView(item)}
													sx={{
														background: "rgba(58, 0, 128, 0.055)",
														boxShadow: "0",
														zIndex: 0,
													}}
												>
													<Visibility />
												</Fab>
												{loadingState[item.pk] ? (
													<Fab
														size="small"
														aria-label="loading"
														sx={{
															background: "rgba(0, 128, 0, 1)",
															boxShadow: "0",
															color: "#fff",
															border: "1px solid rgba(0, 128, 0, 0.145)",
															zIndex: 0,
														}}
													>
														<CircularProgress size={24} color="inherit" />
													</Fab>
												) : (
													<Fab
														size="small"
														color="success"
														aria-label="add"
														sx={{
															zIndex: 0,
														}}
														onClick={() => addToCart(item)}
													>
														<ShoppingBasket />
													</Fab>
												)}
											</Stack>
										</TableCell>
									</TableRow>
							  ))}
					</TableBody>
					<PaginationTable
						count={sortedData.length}
						rowsPerPage={rowsPerPage}
						page={page}
						handleChangePage={handleChangePage}
						handleChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Table>
			</TableContainer>
			<ViewProductDialog open={openViewDialog} onClose={handleCloseDialog} selectedItem={selectedItem} />
		</Box>
	);
};

export default MedicamentTable;
