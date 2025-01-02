import { Badge } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../accountStore";
import { stockInExpired, stockInRupte } from "../../api/product.js";
import ListMenus from "./menu/menu.jsx";

// Créer un store global pour les compteurs
const useCountStore = (() => {
	let expiredCount = 0;
	let outOfStockCount = 0;
	const subscribers = new Set();

	const subscribe = (callback) => {
		subscribers.add(callback);
		return () => subscribers.delete(callback);
	};

	const setCount = (expired, outOfStock) => {
		expiredCount = expired;
		outOfStockCount = outOfStock;
		subscribers.forEach((callback) => callback());
	};

	const getCount = () => ({ expiredCount, outOfStockCount });

	return { subscribe, setCount, getCount };
})();

export default function ProprioSideBar() {
	const { account } = useAccountStore();
	const navigate = useNavigate();
	const location = useLocation();
	const [counts, setCounts] = useState(useCountStore.getCount());
	const isActive = (path) => location.pathname === path;

	useEffect(() => {
		// S'abonner aux changements du store
		return useCountStore.subscribe(() => {
			setCounts(useCountStore.getCount());
		});
	}, []);

	useEffect(() => {
		const fetchCounts = async () => {
			try {
				const expired = await stockInExpired();
				const outOfStock = await stockInRupte();
				// Mettre à jour le store global
				useCountStore.setCount(expired.data.length, outOfStock.data.length);
			} catch (error) {
				console.error("Erreur lors de la récupération des données :", error);
			}
		};

		// Ne charger les données qu'une seule fois au montage initial
		if (counts.expiredCount === 0 && counts.outOfStockCount === 0) {
			fetchCounts();
		}

		if (account.account_type !== "proprios") navigate("/");
	}, [account.account_type, navigate, counts.expiredCount, counts.outOfStockCount]);

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
								{item.path === "/stock_expired_date_admin" ? (
									<Badge badgeContent={counts.expiredCount} color="error">
										{item.icon}
									</Badge>
								) : item.path === "/out_of_stock_admin" ? (
									<Badge badgeContent={counts.outOfStockCount} color="error">
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
