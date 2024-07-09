import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { DateRange, Functions, History, Logout, ProductionQuantityLimitsSharp } from "@mui/icons-material";
import { useState } from "react";
import ExitDialog from "../../components/dialog/exitDialog.jsx";

export default function SideBarVendeur() {
	const [openDialog, setOpenDialog] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();
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
	return (
		<Box sx={{ display: "flex", bgcolor: "white", borderRadius: 5, position: "fixed", minHeight: "100vh" }}>
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
								{item.icon}
							</ListItemIcon>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<ExitDialog open={openDialog} onClose={() => setOpenDialog(false)} />
		</Box>
	);
}
