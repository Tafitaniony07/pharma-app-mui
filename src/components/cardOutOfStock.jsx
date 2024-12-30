import { CalendarMonth, InfoOutlined, ProductionQuantityLimitsOutlined } from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useOutOfStock } from "../contexts/useOutOfStock";
import { formatDate } from "../functions/formatDate";
import { TruncateText } from "../functions/TruncateText";
import LoadingSpinner from "./loadingSpiner";
import ViewProductDialog from "./modal/viewProductDialog";

const CardOutOfStock = () => {
	const { products, loading, error } = useOutOfStock();
	// // État pour stocker l'élément sélectionné
	const [selectedItem, setSelectedItem] = useState(null);
	// // États pour gérer l'ouverture/fermeture des dialogues
	const [openViewDialog, setOpenViewDialog] = useState(false);
	// const [productExp, setProductExp] = useState([]);

	if (error) {
		console.log(error);
	}

	const handleView = (item) => {
		setSelectedItem(item);
		setOpenViewDialog(true);
	};
	const handleCloseDialog = () => {
		setOpenViewDialog(false);
	};
	return (
		<>
			<Box width="100%">
				<Typography component="h2" sx={{ fontSize: "25px" }} color="primary">
					Tous les medicaments en rupture
					<Typography component="p" color="black">
						Il y a {products.length} medicaments en rupture
					</Typography>
				</Typography>
			</Box>

			<Box flexDirection="row" justifyContent="center" alignItems="center">
				<LoadingSpinner loading={loading} message="Veuillez patienter..." />
			</Box>

			<Stack
				flexDirection="row"
				flexGrow={1}
				gap={2}
				alignItems="stretch"
				flexWrap="wrap"
				mt={2}
				sx={{
					maxHeight: "68vh",
					overflowY: "auto",
				}}
			>
				{products.map((product, index) => (
					<Box
						bgcolor="#899481"
						color="#fffff1"
						padding="10px"
						borderRadius={2}
						sx={{ width: "30%" }}
						key={index}
					>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							borderBottom="1px solid rgb(255, 255, 0,0.12)"
							pb={1}
							mb={1}
						>
							<Typography>{TruncateText(product.detail_product.designation, 25)}</Typography>
							<Box
								sx={{
									boxShadow: "0",
									p: "5px 10px",
									display: "flex",
									alignItems: "center",
									gap: "5px",
									borderRadius: "50px",
								}}
							>
								<CalendarMonth sx={{ fontSize: "16px", color: "#e8e2d1" }} />
								<Typography fontSize={14} fontWeight={400} color="#e8e2d1">
									{formatDate(product.date_peremption)}
								</Typography>
							</Box>
						</Stack>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<Stack direction="row" alignItems="center">
								<ProductionQuantityLimitsOutlined sx={{ color: "#cdbcab", fontSize: "20px" }} />
								<Typography ml={1} color="#cdbcab">
									{product.qte_gros + " "}
									{product.qte_gros >= 5
										? product.detail_product.type_gros.toLowerCase() + "s"
										: product.detail_product.type_gros.toLowerCase()}
								</Typography>
							</Stack>
							<Stack direction="row">
								<Fab
									size="small"
									aria-label="view"
									onClick={() => handleView(product)}
									sx={{
										background: "rgba(255, 255, 255,0.055)",
										boxShadow: "0",
										zIndex: 0,
									}}
								>
									<InfoOutlined sx={{ fontSize: "20px", color: "#fff" }} />
								</Fab>
							</Stack>
						</Box>
					</Box>
				))}
			</Stack>

			<ViewProductDialog open={openViewDialog} onClose={handleCloseDialog} selectedItem={selectedItem} />
		</>
	);
};

export default CardOutOfStock;
