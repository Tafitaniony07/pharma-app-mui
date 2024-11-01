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
	Typography,
	Stack,
	Fab,
	Box,
	Skeleton, // Ajoutez l'importation de Skeleton
} from "@mui/material";
import { format } from "date-fns";
import { Visibility, Edit, Delete } from "@mui/icons-material";
import { isExpiringSoon } from "../../components/isExpiredSoon.js";
import { useState } from "react";
import useSortDataTable from "../../components/sortDataTable.js";
import PaginationTable from "../../components/paginationTable.jsx";
import { rowStyle } from "../../components/rowStyle.js";
import useAuth from "../../hooks/useAuth.js";

const ProductTable = ({ columns, data, handleView, handleEdit, handleDelete, loading }) => {
	const { sortedData, sortColumn, sortDirection, handleSort } = useSortDataTable(data);
	const { account_type } = useAuth().account;
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value));
		setPage(0);
	};
	const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

	return (
		<Box>
			<TableContainer sx={{ borderRadius: 3 }}>
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
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading // Condition pour afficher les skeletons
							? Array.from(new Array(rowsPerPage)).map((_, index) => (
									<TableRow key={index} sx={rowStyle}>
										{columns.map((column) => (
											<TableCell key={column.filter}>
												<Skeleton variant="text" width="100%" height={40} />
											</TableCell>
										))}
										<TableCell>
											<Skeleton variant="circular" width={40} height={40} />
										</TableCell>
									</TableRow>
							  ))
							: paginatedData.map((item, index) => (
									<TableRow key={index} sx={rowStyle}>
										{columns.map((column) => (
											<TableCell key={column.filter} sx={{ maxWidth: "150px" }}>
												{column.filter === "date_peremption" ? (
													<Typography
														component="div"
														sx={{
															color: isExpiringSoon(item.date_peremption)
																? "red"
																: "inherit",
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
												) : column.filter === "designation" ||
												  column.filter === "famille" ||
												  column.filter === "classe" ? (
													item.detail_product[column.filter]
												) : (
													item[column.filter]
												)}
												{column.filter === "qte_gros"
													? "  " + item.detail_product.type_gros.toLowerCase()
													: ""}
											</TableCell>
										))}
										<TableCell style={{ whiteSpace: "nowrap" }}>
											<Stack direction="row" gap={1}>
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
												<Fab
													size="small"
													aria-label="edit"
													onClick={() => handleEdit(item)}
													disabled={account_type === "proprios"}
													sx={{
														background: "rgba(0, 128, 0, 0.105)",
														boxShadow: "0",
														border: "1px solid rgba(0, 128, 0, 0.145)",
														zIndex: 0,
													}}
												>
													<Edit />
												</Fab>
												<Fab
													size="small"
													aria-label="delete"
													onClick={() => handleDelete(item)}
													disabled={account_type === "proprios"}
													sx={{
														background: "rgba(255, 0, 0, 0.105)",
														boxShadow: "0",
														border: "1px solid rgba(255, 0, 0, 0.145)",
														"&:hover": {
															background: "rgba(255, 0, 0, 0.245)",
															color: "red",
														},
														zIndex: 0,
													}}
												>
													<Delete />
												</Fab>
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
		</Box>
	);
};

export default ProductTable;
