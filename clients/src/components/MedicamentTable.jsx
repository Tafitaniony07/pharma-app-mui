/* eslint-disable react/prop-types */
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	TextField,
	Select,
	MenuItem,
	Fab,
	CircularProgress,
	Stack,
} from "@mui/material";
import { Check, ArrowRightAlt } from "@mui/icons-material";

const MedicamentTable = ({
	sortColumn,
	sortDirection,
	handleSort,
	paginatedData,
	loadingState,
	addCart,
	units,
	quantities,
	setUnits,
	setQuantities,
	addToCart,
}) => {
	return (
		<>
			<TableContainer>
				<Table stickyHeader aria-label="sticky header">
					<TableHead>
						<TableRow>
							<TableCell>
								<TableSortLabel
									active={sortColumn === "name"}
									direction={sortDirection}
									onClick={() => handleSort("name")}
								>
									Nom
								</TableSortLabel>
							</TableCell>
							<TableCell>Q. Détail</TableCell>
							<TableCell>Q. Gros</TableCell>
							<TableCell>
								<TableSortLabel
									active={sortColumn === "price"}
									direction={sortDirection}
									onClick={() => handleSort("price")}
								>
									Prix Gros
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={sortColumn === "price"}
									direction={sortDirection}
									onClick={() => handleSort("price")}
								>
									Prix Détails
								</TableSortLabel>
							</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedData.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.name}</TableCell>
								<TableCell>{item.quantity}</TableCell>
								<TableCell>
									<TextField
										type="number"
										value={quantities[item.name] || 1}
										onChange={(e) =>
											setQuantities({
												...quantities,
												[item.name]: parseInt(e.target.value, 10),
											})
										}
										size="small"
										sx={{ width: 60 }}
									/>
								</TableCell>
								<TableCell>
									<TextField
										type="number"
										value={quantities[item.name] || 1}
										onChange={(e) =>
											setQuantities({
												...quantities,
												[item.name]: parseInt(e.target.value, 10),
											})
										}
										size="small"
										sx={{ width: 60 }}
									/>
								</TableCell>
								<TableCell>{item.priceGros} Ar</TableCell>
								<TableCell>{item.unitPrice} Ar</TableCell>
								<TableCell>
									<Stack direction="row" gap={2}>
										{loadingState[item.name] ? (
											<Fab
												size="small"
												aria-label="loading"
												sx={{
													background: "rgba(0, 128, 0, 1)",
													boxShadow: "0",
													color: "#fff",
													border: "1px solid rgba(0, 128, 0, 0.145)",
												}}
											>
												<CircularProgress size={24} color="inherit" />
											</Fab>
										) : (
											<Fab
												size="small"
												color="success"
												aria-label="add"
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
		</>
	);
};

export default MedicamentTable;
