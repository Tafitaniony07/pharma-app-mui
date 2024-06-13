/* eslint-disable react/prop-types */
import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	InputAdornment,
	TextField,
	Select,
	MenuItem,
	Fab,
	CircularProgress,
	Stack,
} from "@mui/material";
import { ShoppingCartOutlined, Check } from "@mui/icons-material";

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
							<TableCell>
								<TableSortLabel
									active={sortColumn === "quantity"}
									direction={sortDirection}
									onClick={() => handleSort("quantity")}
								>
									Quantité
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={sortColumn === "price"}
									direction={sortDirection}
									onClick={() => handleSort("price")}
								>
									Prix
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
								<TableCell>{item.price} Ar</TableCell>
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
										) : addCart.some(
												(cartItem) =>
													cartItem.name === item.name && cartItem.unit === units[item.name]
										  ) ? (
											<Fab
												size="small"
												aria-label="added"
												sx={{
													background: "rgba(0, 128, 0, 1)",
													boxShadow: "0",
													color: "#fff",
													border: "1px solid rgba(0, 128, 0, 0.145)",
													"&:hover": {
														color: "rgba(0, 128, 0, 1)",
														background: "rgba(0, 128, 0, 0.145)",
													},
												}}
											>
												<Check />
											</Fab>
										) : (
											<>
												<Select
													value={units[item.name] || "plaquette"}
													onChange={(e) =>
														setUnits({
															...units,
															[item.name]: e.target.value,
														})
													}
													size="small"
													sx={{ minWidth: 80 }}
												>
													<MenuItem value="plaquette">Plaquette</MenuItem>
													<MenuItem value="boîte">Boîte</MenuItem>
												</Select>
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
												<Fab
													size="small"
													color="success"
													aria-label="add"
													onClick={() => addToCart(item)}
												>
													<ShoppingCartOutlined />
												</Fab>
											</>
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
