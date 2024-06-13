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
import { Print } from "@mui/icons-material";

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
	printInvoice,
}) => {
	return (
		<>
			{addCart.length > 0 ? (
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nom</TableCell>
								<TableCell>Unité</TableCell>
								<TableCell>Quantité</TableCell>
								<TableCell>Prix</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{addCart.map((item, index) => (
								<TableRow key={index}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.unit}</TableCell>
									<TableCell>
										<TextField
											type="number"
											value={item.quantity}
											onChange={(e) =>
												updateCartQuantity(item.name, parseInt(e.target.value, 10))
											}
											size="small"
											sx={{ width: 60 }}
										/>
									</TableCell>
									<TableCell>{item.price} Ar</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
					<TextField
						label="Nom du client"
						value={clientName}
						onChange={(e) => setClientName(e.target.value)}
						fullWidth
						sx={{ mt: 2 }}
					/>
					<Select
						label="État du paiement"
						value={paymentStatus}
						onChange={(e) => setPaymentStatus(e.target.value)}
						fullWidth
						sx={{ mt: 2 }}
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
							sx={{ mt: 2 }}
						/>
					)}
					<Typography variant="h6" sx={{ mt: 2 }}>
						Total: {calculateTotalPrice()} Ar
					</Typography>
					<Stack direction="row" spacing={2} sx={{ mt: 2 }}>
						<Button variant="contained" color="primary" onClick={saveTransaction}>
							Enregistrer la transaction
						</Button>
						<Button variant="contained" color="secondary" onClick={printInvoice} startIcon={<Print />}>
							Imprimer la facture
						</Button>
					</Stack>
				</TableContainer>
			) : (
				<p>Votre panier est vide.</p>
			)}
		</>
	);
};

export default Panier;
