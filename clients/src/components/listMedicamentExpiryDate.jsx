import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, TableSortLabel, Typography } from "@mui/material";
import { format } from "date-fns";
import PaginationTable from "./paginationTable.jsx";
import useSortDataTable from "./sortDataTable.js";
import { useEffect, useState } from "react";
import { rowStyle } from "./rowStyle.js";
import { stockInExpired } from "../api/product.js";

export default function ListMedicamentExpiryDate() {
	const [medic, setMedic] = useState([]);
	const columns = [
		{ filter: "family", label: "Famille" },
		{ filter: "designation", label: "Designation" },
		{ filter: "classe", label: "Classe" },
		{ filter: "marque", label: "Marque" },
		{ filter: "quantity", label: "Quantité" },
		{ filter: "date_peremption", label: "Date de péremption" },
	];
	useEffect(() => {
		const fetch = async () => {
			const res = await stockInExpired();
			setMedic(res.data);
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
							{columns.map((column) => (
								<TableCell key={column.filter}>
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
						{paginatedData.map((item, index) => (
							<TableRow key={index} sx={rowStyle} style={{ whiteSpace: "nowrap" }}>
								<TableCell>{item.detail_product.famille}</TableCell>
								<TableCell>{item.detail_product.designation}</TableCell>
								<TableCell>{item.detail_product.classe}</TableCell>
								<TableCell>{item.marque_product}</TableCell>
								<TableCell>
									{item.qte_gros} {item.detail_product.type_gros}
								</TableCell>
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
										{format(new Date(item.date_peremption), "dd/MM/yyyy")}
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
