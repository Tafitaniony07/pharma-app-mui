import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../../accountStore.js";
import { stockInExpired, stockInRupte } from "../../../api/product.js";
import ExitDialog from "../../../components/modal/exitDialog.jsx";
import ListMenus from "../menu/menu.jsx";

export default function SideBarVendeur() {
	const [openDialog, setOpenDialog] = useState(false);
	const { account } = useAccountStore();
	const navigate = useNavigate();
	const location = useLocation();
	const [expiredCount, setExpiredCount] = useState(0);
	const [outOfStockCount, setOutOfStockCount] = useState(0);
	const isActive = (path) => location.pathname === path;
	function handleClick() {
		setOpenDialog(true);
	}

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const expired = await stockInExpired(); // Récupérer le nombre de médicaments périmés
				const outOfStock = await stockInRupte(); // Récupérer le nombre de médicaments en rupture
				setExpiredCount(expired.data.length); // Supposons que le résultat soit un tableau
				setOutOfStockCount(outOfStock.data.length); // Supposons que le résultat soit un tableau
			} catch (error) {
				console.error("Erreur lors de la récupération des données :", error);
			}
		};
		fetchCounts();
		if (account.account_type !== "vendeurs") navigate("/");
	}, [account.account_type, navigate]);
	return (
		<Box
			sx={{
				display: "flex",
				bgcolor: "white",
				borderRadius: 5,
				height: "100%",
			}}
		>
			<List sx={{ width: "100%", my: 3 }}>
				{ListMenus.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: "block" }}
						onClick={() => {
							if (item.path === "/logout") {
								handleClick();
							} else {
								navigate(item.path);
							}
						}}
					>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: "initial",
								px: 5,
								mt: index === 0 ? 0 : 2.5,
								color: isActive(item.path) ? "#4d4373" : "inherit",
								borderRight: isActive(item.path) ? "4px solid #4d4373" : "none",
								backgroundColor: isActive(item.path) ? "rgba(58, 0, 128, 0.025)" : "transparent",
								transition: "transform 0.8s ease",
								"&:hover": {
									transform: "translateX(10px)", // Légère mise à l'échelle
									borderColor: "secondary.main", // Couleur de la bordure lors du survol
									cursor: "pointer",
									background: "#fff",
									borderRadius: 1,
								},
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: 3,
									color: isActive(item.path) ? "#4d4373" : "inherit",
									justifyContent: "center",
								}}
							>
								{item.path === "/stock_expired_date_vendeur" ? (
									<Badge badgeContent={expiredCount} color="error">
										{item.icon}
									</Badge>
								) : item.path === "/stock_least_quantity_vendeur" ? (
									<Badge badgeContent={outOfStockCount} color="error">
										{item.icon}
									</Badge>
								) : (
									item.icon
								)}
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<ExitDialog open={openDialog} onClose={() => setOpenDialog(false)} />
		</Box>
	);
}
