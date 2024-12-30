import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ExitDialog from "../../../components/modal/exitDialog.jsx";
import { useExpiredMedicaments } from "../../../contexts/useExpiredMedicaments.js";
import { useOutOfStock } from "../../../contexts/useOutOfStock.js";
import ListMenus from "../menu/menu.jsx";

export default function SideBarVendeur() {
	const { products } = useOutOfStock();
	const { productExpired } = useExpiredMedicaments();
	const countOfOutStock = products.length;
	const countExpiredStock = productExpired.length;
	const navigate = useNavigate();
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	const [openDialog, setOpenDialog] = useState(false);

	function handleClick() {
		setOpenDialog(true);
	}

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
								{item.path === "/stock_expired_date_vendeur" ? (
									<Badge badgeContent={countExpiredStock} color="error">
										{item.icon}
									</Badge>
								) : item.path === "/out_of_stock_vendeur" ? (
									<Badge badgeContent={countOfOutStock} color="error">
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
