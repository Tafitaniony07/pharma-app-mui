import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, TableFooter, TableSortLabel, Typography } from "@mui/material";
import { Medicaments } from "../data/listmedicaments.jsx";
import { useEffect, useState } from "react";
import { addMonths, format, isBefore } from "date-fns";
import { stockInExpired } from "../api/product.js";

export default function StickyHeadTable() {
	const [sortColumn, setSortColumn] = useState("designation");
	const [sortDirection, setSortDirection] = useState("asc");
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const columns = [
		{ filter: "family", label: "Famille" },
		{ filter: "designation", label: "Designation" },
		{ filter: "classe", label: "Classe" },
		{ filter: "marque", label: "Marque" },
		{ filter: "quantity", label: "Quantité" },
		{ filter: "date_peremption", label: "Date de péremption" },
	];
	useEffect(()=>{
		const medicaments = async ()=>{
			const res = await stockInExpired()
			console.log(res.data);
		}
		medicaments()
	}, [])
	const sortedData = Medicaments.sort((a, b) => {
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
	const isExpiringSoon = (date_peremption) => {
		const today = new Date();
		const threeMonthsLater = addMonths(today, 3);
		return isBefore(date_peremption, threeMonthsLater);
	};
	const filteredData = sortedData.filter((item) => isExpiringSoon(item.date_peremption));
	const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	return (
		<Box sx={{ width: "100%", overflow: "hidden" }}>
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
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.family}</TableCell>
								<TableCell>{item.designation}</TableCell>
								<TableCell>{item.classe}</TableCell>
								<TableCell>{item.marque}</TableCell>
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
							</TableRow>
						))}
					</TableBody>

					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25]}
								colSpan={12}
								count={Medicaments.length}
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
		</Box>
	);
}
