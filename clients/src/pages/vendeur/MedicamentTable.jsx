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
} from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { TruncateText } from "../../components/TruncateText.jsx";

const MedicamentTable = ({ sortColumn, sortDirection, handleSort, paginatedData, loadingState, addToCart }) => {
	const columns = [
		{ minWidth: 100, label: "Designation", filter: "name" },
		{ minWidth: 85, label: "Marque", filter: "brand" },
		{ minWidth: 85, label: "Classe", filter: "class" },
		{ minWidth: 85, label: "Prix Détail", filter: "price" },
		{ minWidth: 85, label: "Prix Gros", filter: "price" },
		{ minWidth: 50, label: "Actions" },
	];

	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<TableContainer sx={{ maxHeight: "70vh", borderRadius: 3 }}>
				<Table stickyHeader aria-label="sticky header">
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
								<TableCell key={index} style={{ minWidth: column.minWidth }}>
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
								<TableCell>{TruncateText(item.detail_product.designation, 15)}</TableCell>
								<TableCell>{item.marque_product}</TableCell>
								<TableCell>{item.detail_product.classe}</TableCell>
								<TableCell>{item.prix_uniter} Ar</TableCell>
								<TableCell>{item.prix_gros} Ar</TableCell>
								<TableCell style={{ whiteSpace: "nowrap" }}>
									<Stack direction="row" gap={2}>
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
												<ArrowRightAlt />
											</Fab>
										)}
									</Stack>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default MedicamentTable;
