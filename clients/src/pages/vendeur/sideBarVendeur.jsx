import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { useLocation, useNavigate } from "react-router-dom";
import { DateRange, History, Logout, ProductionQuantityLimitsSharp } from "@mui/icons-material";

export default function SideBarVendeur() {
	const navigate = useNavigate();
	const location = useLocation();
	const isActive = (path) => location.pathname === path;
	const items = [
		{
			icon: <DashboardIcon />,
			path: "/",
		},
		{
			icon: <DateRange />,
			path: "/expirydate",
		},
		{
			icon: <ProductionQuantityLimitsSharp />,
			path: "/least_stock",
		},
		{
			icon: <History />,
			path: "/transactions",
		},
		{
			icon: <Logout />,
			path: "/",
		},
	];
	return (
		<Box sx={{ display: "flex", bgcolor: "white", borderRadius: 5, position: "fixed", height: "100vh" }}>
			<List sx={{ width: "100%", my: 3 }}>
				{items.map((item, index) => (
					<ListItem
						key={index}
						disablePadding
						sx={{ display: "block" }}
						onClick={() => {
							navigate(item.path);
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
								{item.icon}
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
