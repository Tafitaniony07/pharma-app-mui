import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate, useLocation } from "react-router-dom";
import { DateRange, History, MoneyOff, Person, ProductionQuantityLimitsOutlined } from "@mui/icons-material";

export default function AdminSideBar() {
	const navigate = useNavigate();
	const location = useLocation();
	const isActive = (path) => location.pathname === path;
	const menuItems = [
		{ text: "DashBoard", icon: <DashboardIcon />, path: "/admin_dashboard" },
		{ text: "Ajout Produit", icon: <AddCircleIcon />, path: "/addproduct" },
		{ text: "D. Peremption", icon: <DateRange />, path: "/expirydate" },
		{ text: "Etat de Stock", icon: <ProductionQuantityLimitsOutlined />, path: "/least_stock" },
		{ text: "Transactions", icon: <History />, path: "/transactions" },
		{ text: "Nouveau Compte", icon: <Person />, path: "/create_account" },
		{ text: "Trosa", icon: <MoneyOff />, path: "/list_trosa" },
	];

	return (
		<Box sx={{ display: "flex", bgcolor: "white", borderRadius: 5, position: "fixed", height: "100vh" }}>
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
								{item.icon}
							</ListItemIcon>
							<ListItemText primary={item.text} sx={{ opacity: 1 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
