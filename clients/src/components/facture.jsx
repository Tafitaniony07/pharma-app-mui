/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from "react";
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Receipt = React.forwardRef(({ transaction }, ref) => {
	const { clientName, date, paymentStatus, remainingAmount, totalPaid, items } = transaction;

	return (
		<Box ref={ref} sx={{ p: 3, bgcolor: "white", borderRadius: 5 }}>
			<Typography variant="h6" gutterBottom>
				Facture
			</Typography>
			<Typography variant="body1">
				<strong>Nom du client:</strong> {clientName}
			</Typography>
			<Typography variant="body1">
				<strong>Date d'achat:</strong> {new Date(date).toLocaleString()}
			</Typography>
			<Typography variant="body1">
				<strong>État de paiement:</strong> {paymentStatus}
			</Typography>
			{paymentStatus === "Reste à payer" && (
				<Typography variant="body1">
					<strong>Montant restant:</strong> {remainingAmount} Ar
				</Typography>
			)}
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Nom</TableCell>
							<TableCell>Quantité</TableCell>
							<TableCell>Marque</TableCell>
							<TableCell>Prix</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.name}</TableCell>
								<TableCell>
									{item.quantityDetails > 0
										? `${item.quantityDetails} (détail)`
										: `${item.quantityBulk} (gros)`}
								</TableCell>
								<TableCell>{item.marque}</TableCell>
								<TableCell>{item.price} Ar</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Typography variant="h6" sx={{ mt: 2 }}>
				Total: {totalPaid} Ar
			</Typography>
		</Box>
	);
});

export default Receipt;
