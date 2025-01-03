/* eslint-disable react/prop-types */
import { ChevronRight, Close } from "@mui/icons-material";
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { format } from "date-fns";

const ViewProductDialog = ({ open, onClose, selectedItem }) => {
	if (!selectedItem) return null;

	const details = [
		{ label: "Famille", value: selectedItem.detail_product.famille },
		{ label: "Classe", value: selectedItem.detail_product.classe },
		{ label: "Désignation", value: selectedItem.detail_product.designation },
		{ label: "Marque", value: selectedItem.marque_product },
		{ label: "Prix unitaire", value: `${selectedItem.prix_uniter} Ar` },
		{ label: "Prix de gros", value: `${selectedItem.prix_gros} Ar` },
		{
			label: "Quantité",
			value: `${selectedItem.qte_gros} ${selectedItem.detail_product.type_gros}`,
		},
		{
			label: `Quantité unitaire`,
			value: `${selectedItem.qte_uniter} ${selectedItem.detail_product.type_uniter}`,
		},
		{
			label: "Date de péremption",
			value: format(selectedItem.date_peremption, "dd/MM/yyyy"),
		},
	];

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle sx={{ borderBottom: "1px solid #e0e0e0" }}>Voir le produit</DialogTitle>

			<DialogContent sx={{ my: "20px" }}>
				<Stack spacing={2}>
					{details.map((detail) => (
						<Stack key={detail.label} direction="row" spacing={1} alignItems="center">
							<Typography variant="subtitle1" sx={{ fontWeight: "500" }}>
								{detail.label}:
							</Typography>
							<Chip
								icon={<ChevronRight />}
								label={detail.value}
								sx={{ backgroundColor: "#045D5D03", fontSize: "15px" }}
							/>
						</Stack>
					))}
				</Stack>
			</DialogContent>
			<DialogActions sx={{ position: "absolute", right: "0", top: "0" }}>
				<Fab
					size="small"
					aria-label="view"
					onClick={onClose}
					sx={{ color: "white", bgcolor: "secondary.main", boxShadow: "0" }}
				>
					<Close />
				</Fab>
			</DialogActions>
		</Dialog>
	);
};

export default ViewProductDialog;
