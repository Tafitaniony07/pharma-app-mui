/* eslint-disable no-mixed-spaces-and-tabs */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TableSortLabel, Typography, Skeleton } from "@mui/material"; // Importer Skeleton
import PaginationTable from "./paginationTable.jsx";
import useSortDataTable from "./sortDataTable.js";
import { useEffect, useState } from "react";
import { rowStyle } from "./rowStyle.js";
import { stockInExpired } from "../api/product.js";
import { formatDate } from "./formatDate.js";
import { expiryColumn } from "./columns.js";

export default function ListMedicamentExpiryDate() {
	const [medic, setMedic] = useState([]);
	const [loading, setLoading] = useState(true); // État de chargement

	useEffect(() => {
		const fetch = async () => {
			const res = await stockInExpired();
			setMedic(res.data);
			setLoading(false); // Fin du chargement
		};

		fetch();
	}, []);

	const { sortedData, sortColumn, sortDirection, handleSort } = useSortDataTable(medic);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<TableContainer sx={{ maxHeight: "80vh", borderRadius: 3 }}>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							{expiryColumn.map((column) => (
								<TableCell key={column.filter} style={{ minWidth: column.maxWidth }}>
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
							? Array.from(new Array(10)).map(
									(
										_,
										index // 10 lignes de skeleton
									) => (
										<TableRow key={index}>
											{expiryColumn.map((_, colIndex) => (
												<TableCell key={colIndex}>
													<Skeleton variant="rounded" height={30} />{" "}
													{/* Skeleton pour chaque cellule */}
												</TableCell>
											))}
										</TableRow>
									)
							  )
							: paginatedData.map((item, index) => (
									<TableRow key={index} sx={rowStyle}>
										<TableCell>{item.detail_product.famille}</TableCell>
										<TableCell>{item.detail_product.designation}</TableCell>
										<TableCell>{item.detail_product.classe}</TableCell>
										<TableCell>{item.marque_product}</TableCell>
										<TableCell>
											{item.qte_gros + " "}
											{item.qte_gros >= 5
												? item.detail_product.type_gros.toLowerCase() + "s"
												: item.detail_product.type_gros.toLowerCase()}
										</TableCell>
										<TableCell>{item.prix_uniter} Ar</TableCell>
										<TableCell>{item.prix_gros} Ar</TableCell>
										<TableCell>{item.fournisseur_product}</TableCell>
										<TableCell>
											<Typography
												component="div"
												sx={{
													color: "red",
													backgroundColor: "rgba(255, 0, 0, 0.145)",
													display: "inline-block",
													p: "3px 13px",
													borderRadius: "50px",
													fontSize: "14px",
												}}
											>
												{formatDate(item.date_peremption)}
											</Typography>
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
		</Box>
	);
}
