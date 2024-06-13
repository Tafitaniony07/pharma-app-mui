/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";
import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from "@mui/material";

const Invoice = forwardRef(({ clientName, addCart, paymentStatus, remainingAmount }, ref) => {
	const total = addCart.reduce((acc, item) => acc + item.price, 0);

	return (
		<Box ref={ref} sx={{ padding: 3 }}>
			<Typography variant="h4" align="center">
				Facture
			</Typography>
			<Box m={2}>
				<Typography variant="h6">Client:</Typography>
				<Typography>{clientName}</Typography>
				<Typography>Date: {new Date().toLocaleString()}</Typography>
			</Box>
			<TableContainer component={Paper}>
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
								<TableCell>{item.quantity}</TableCell>
								<TableCell>{item.price} Ar</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Typography variant="h6" sx={{ mt: 2 }}>
				État du paiement: {paymentStatus}
			</Typography>
			{paymentStatus === "Reste à payer" && (
				<Typography variant="h6">Reste à payer: {remainingAmount} Ar</Typography>
			)}
			<Typography variant="h6" sx={{ mt: 2 }}>
				Total: {total} Ar
			</Typography>
		</Box>
	);
});

export default Invoice;
