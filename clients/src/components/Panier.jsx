/* eslint-disable react/prop-types */
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Select,
	MenuItem,
	Typography,
	Button,
	Stack,
} from "@mui/material";
import { Cancel, ClearAll } from "@mui/icons-material";
import { TruncateText } from "./TruncateText.jsx";

const Panier = ({
	addCart,
	clientName,
	paymentStatus,
	remainingAmount,
	updateCartQuantity,
	calculateTotalPrice,
	setClientName,
	setPaymentStatus,
	setRemainingAmount,
	saveTransaction,
	clearCart,
	removeFromCart,
}) => {
	return (
		<>
			{addCart.length > 0 ? (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nom</TableCell>
								<TableCell>Q.D</TableCell>
								<TableCell>Q.G</TableCell>
								<TableCell>Prix</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{addCart.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{TruncateText(item.name, 12)}</TableCell>
									<TableCell>
										<TextField
											type="number"
											value={item.quantityDetails}
											onChange={(e) =>
												updateCartQuantity(item.name, "details", parseInt(e.target.value, 10))
											}
											size="small"
											sx={{
												width: 60,
												"& .MuiOutlinedInput-input": {
													padding: "7px 5px",
												},
											}}
										/>
									</TableCell>
									<TableCell>
										<TextField
											type="number"
											value={item.quantityBulk}
											onChange={(e) =>
												updateCartQuantity(item.name, "bulk", parseInt(e.target.value, 10))
											}
											size="small"
											sx={{
												width: 60,
												"& .MuiOutlinedInput-input": {
													padding: "7px 5px",
												},
											}}
										/>
									</TableCell>
									<TableCell>
										<Stack direction="row" alignItems="center" gap={2}>
											{item.price} Ar
											<Cancel
												color="error"
												onClick={() => removeFromCart(item.name)}
												sx={{
													"&: hover": {
														cursor: "pointer",
														color: "secondary.main",
													},
												}}
											/>
										</Stack>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<TextField
						label="Nom du client"
						value={clientName}
						sx={{
							mt: 2,
						}}
						onChange={(e) => setClientName(e.target.value)}
						fullWidth
					/>
					<Select
						label="État du paiement"
						value={paymentStatus}
						onChange={(e) => setPaymentStatus(e.target.value)}
						fullWidth
						sx={{
							mt: 2,
						}}
					>
						<MenuItem value="Payé">Payé</MenuItem>
						<MenuItem value="Reste à payer">Reste à payer</MenuItem>
					</Select>
					{paymentStatus === "Reste à payer" && (
						<TextField
							label="Montant restant"
							type="number"
							value={remainingAmount}
							onChange={(e) => setRemainingAmount(parseInt(e.target.value, 10))}
							fullWidth
							sx={{
								mt: 2,
							}}
						/>
					)}
					<Typography variant="h6" sx={{ my: 2 }}>
						Total: {calculateTotalPrice()} Ar
					</Typography>
					<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
						<Button variant="contained" color="primary" onClick={saveTransaction}>
							Valider
						</Button>
						<Button variant="contained" color="secondary" onClick={clearCart} startIcon={<ClearAll />}>
							Vider le panier
						</Button>
					</Stack>
				</TableContainer>
			) : (
				<Typography color="secondary">Votre panier est vide.</Typography>
			)}
		</>
	);
};

export default Panier;
