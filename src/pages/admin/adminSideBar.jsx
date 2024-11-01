import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate, useLocation } from "react-router-dom";
import {
	DateRange,
	Functions,
	History,
	MoneyOff,
	Password,
	ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAccountStore } from "../../accountStore";
import Badge from "@mui/material/Badge";
import { stockInExpired, stockInRupte } from "../../api/product.js"; // Importer les fonctions pour obtenir les quantités

export default function AdminSideBar() {
	const { account } = useAccountStore();
	const navigate = useNavigate();
	const location = useLocation();
	const [expiredCount, setExpiredCount] = useState(0);
	const [outOfStockCount, setOutOfStockCount] = useState(0);

	const isActive = (path) => location.pathname === path;

	const menuItems = [
		{ text: "DashBoard", icon: <DashboardIcon />, path: "/" },
		{ text: "Ajout Produit", icon: <AddCircleIcon />, path: "/addproduct" },
		{
			text: "Stock Périmé",
			icon: <DateRange />,
			path: "/expiry_date_admin",
		},
		{
			text: "Stock en Rupture",
			icon: <ProductionQuantityLimitsOutlined />,
			path: "/stock_expired_quantity",
		},
		{
			text: "Transactions",
			icon: <History />,
			path: "/transactions",
		},
		{
			text: "Total Transactions",
			icon: <Functions />,
			path: "/total_transactions",
		},
		{ text: "Changer Mdp", icon: <Password />, path: "/update_password" },
		{ text: "Trosa", icon: <MoneyOff />, path: "/list_trosa" },
	];

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
		if (account.account_type !== "gestionnaires") navigate("/");
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
				{menuItems.map((item, index) => (
					<ListItem key={index} disablePadding sx={{ display: "block" }} onClick={() => navigate(item.path)}>
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
									transform: "translateX(10px)",
									borderColor: "secondary.main",
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
								{item.path === "/expiry_date_admin" ? (
									<Badge badgeContent={expiredCount} color="error">
										{item.icon}
									</Badge>
								) : item.path === "/stock_expired_quantity" ? (
									<Badge badgeContent={outOfStockCount} color="error">
										{item.icon}
									</Badge>
								) : (
									item.icon
								)}
							</ListItemIcon>
							<ListItemText primary={item.text} sx={{ opacity: 1 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
