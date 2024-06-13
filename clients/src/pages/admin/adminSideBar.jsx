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
	Add,
	AddBoxOutlined,
	DateRange,
	ExpandLess,
	ExpandMore,
	History,
	ListAlt,
	ListAltOutlined,
	MoneyOff,
	Person,
	ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { Collapse } from "@mui/material";

export default function AdminSideBar() {
	const navigate = useNavigate();
	const location = useLocation();
	const isActive = (path) => location.pathname === path;
	const menuItems = [
		{ text: "DashBoard", icon: <DashboardIcon />, path: "/dashboard" },
		{ text: "Add Medicaments", icon: <AddCircleIcon />, path: "/addproduct" },
		{ text: "Expiry Date", icon: <DateRange />, path: "/expirydate" },
		{ text: "Etat de Stock", icon: <ProductionQuantityLimitsOutlined />, path: "/leaststock" },
		{ text: "Transactions", icon: <History />, path: "/transactions" },
		{ text: "Nouveau Compte", icon: <Person />, path: "/create_account" },
	];
	const trosaOption = [
		{ text: "Nouveau Trosa", icon: <Add />, path: "/trosa" },
		{ text: "Listes de Trosa", icon: <ListAlt />, path: "/list_trosa" },
	];
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(!open);
	};
	return (
		<Box sx={{ display: "flex" }}>
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
								borderLeft: isActive(item.path) ? "4px solid #4d4373" : "none",
								backgroundColor: isActive(item.path) ? "rgba(58, 0, 128, 0.025)" : "transparent",
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
				<ListItemButton
					onClick={handleClick}
					sx={{
						minHeight: 48,
						justifyContent: "initial",

						px: 5,
					}}
				>
					<ListItemIcon>
						<MoneyOff />
					</ListItemIcon>
					<ListItemText primary="Trosa" />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={open} timeout="auto" unmountOnExit>
					{trosaOption.map((item, index) => (
						<List disablePadding key={index}>
							<ListItemButton
								onClick={() => navigate(item.path)}
								sx={{
									color: isActive(item.path) ? "#4d4373" : "inherit",
									borderLeft: isActive(item.path) ? "4px solid #4d4373" : "none",
									backgroundColor: isActive(item.path) ? "rgba(58, 0, 128, 0.025)" : "transparent",
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
								<ListItemText primary={item.text} />
							</ListItemButton>
						</List>
					))}
				</Collapse>
			</List>
		</Box>
	);
}
