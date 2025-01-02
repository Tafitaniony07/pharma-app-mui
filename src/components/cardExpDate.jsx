import { CalendarMonth, FolderOutlined, InfoOutlined } from "@mui/icons-material";
import { Box, Fab, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useExpiredMedicaments } from "../contexts/useExpiredMedicaments";
import { formatDate } from "../functions/formatDate";
import LoadingSpinner from "./loadingSpiner";
import ViewProductDialog from "./modal/viewProductDialog";

const CardExpDate = () => {
	// const [productExp, setProductExp] = useState([]);
	const { productExpired, loading, error } = useExpiredMedicaments();

	// État pour stocker l'élément sélectionné
	const [selectedItem, setSelectedItem] = useState(null);
	// États pour gérer l'ouverture/fermeture des dialogues
	const [openViewDialog, setOpenViewDialog] = useState(false);
	if (error) {
		console.log(error);
	}

	// useEffect(() => {
	// 	// Fonction asynchrone pour récupérer les données
	// 	const fetch = async () => {
	// 		const res = await stockInExpired();
	// 		setProductExp(res.data);
	// 	};

	// 	fetch();
	// }, []);
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
					Tous les medicaments expirées
					<Typography component="p" color="black">
						Il y a {productExpired.length} medicaments expirées
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
				{productExpired.map((product, index) => (
					<Box
						bgcolor="#9ecbcc30"
						color="#171717"
						padding="10px"
						borderRadius={2}
						sx={{ width: "30%" }}
						key={index}
					>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							borderBottom="1px solid #045D5D15"
							pb={1}
							mb={1}
						>
							<Typography>{product.detail_product.designation}</Typography>
							<Box
								sx={{
									boxShadow: "0",
									color: "red",
									p: "5px 10px",
									display: "flex",
									alignItems: "center",
									gap: "5px",
									borderRadius: "50px",
								}}
							>
								<CalendarMonth sx={{ fontSize: "16px" }} />
								<Typography fontSize={14} fontWeight={400}>
									{formatDate(product.date_peremption)}
								</Typography>
							</Box>
						</Stack>
						<Box display="flex" justifyContent="space-between" alignItems="center">
							<Stack direction="row">
								<FolderOutlined />
								<Typography ml={1}>
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
										background: "#045D5D09",
										boxShadow: "0",
										zIndex: 0,
									}}
								>
									<InfoOutlined sx={{ fontSize: "20px" }} />
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

export default CardExpDate;
