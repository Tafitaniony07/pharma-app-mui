/* eslint-disable no-mixed-spaces-and-tabs */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TableSortLabel, Typography, Skeleton } from "@mui/material";
import { format } from "date-fns";
import PaginationTable from "./paginationTable.jsx";
import useSortDataTable from "./sortDataTable.js";
import { useEffect, useState } from "react";
import { rowStyle } from "./rowStyle.js";
import { stockInRupte } from "../api/product.js";
import { expiryColumn } from "./columns.js";

export default function ListRuptureStock() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true); // État de chargement
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		const fetch = async () => {
			const res = await stockInRupte();
			setData(res.data);
			setLoading(false); // Charger les données, désactiver le chargement
		};
		fetch();
	}, []);

	const { sortedData, sortColumn, sortDirection, handleSort } = useSortDataTable(data);

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
							? Array.from(new Array(10)).map((_, index) => (
									<TableRow key={index}>
										{expiryColumn.map((column, colIndex) => (
											<TableCell key={colIndex}>
												<Skeleton variant="rounded" height={30} />
											</TableCell>
										))}
									</TableRow>
							  ))
							: paginatedData.map((item, index) => (
									<TableRow key={index} sx={rowStyle} style={{ whiteSpace: "wrap" }}>
										<TableCell>{item.detail_product.famille}</TableCell>
										<TableCell>{item.detail_product.designation}</TableCell>
										<TableCell>{item.detail_product.classe}</TableCell>
										<TableCell>{item.marque_product}</TableCell>
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
												{item.qte_gros} {item.detail_product.type_gros}
											</Typography>
										</TableCell>
										<TableCell>{item.prix_uniter}</TableCell>
										<TableCell>{item.prix_gros}</TableCell>
										<TableCell>{item.fournisseur_product}</TableCell>
										<TableCell>{format(new Date(item.date_peremption), "dd/MM/yyyy")}</TableCell>
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
