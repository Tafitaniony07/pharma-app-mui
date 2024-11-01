import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange, Functions, History, Logout, ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ExitDialog from "../../components/dialog/exitDialog.jsx";
import { useAccountStore } from "../../accountStore.js";
import { stockInExpired, stockInRupte } from "../../api/product.js";
import { Badge } from "@mui/material";

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
	const items = [
		{
			icon: <DashboardIcon />,
			path: "/",
		},
		{
			icon: <DateRange />,
			path: "/expiry_date_user",
		},
		{
			icon: <ProductionQuantityLimitsSharp />,
			path: "/stock_expired_quantity_user",
		},
		{
			icon: <History />,
			path: "/transactions_user",
		},
		{ icon: <Functions />, path: "/total_transaction_user" },

		{
			icon: <Logout />,
			path: "/logout",
		},
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
				{items.map((item, index) => (
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
								{item.path === "/expiry_date_user" ? (
									<Badge badgeContent={expiredCount} color="error">
										{item.icon}
									</Badge>
								) : item.path === "/stock_expired_quantity_user" ? (
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
