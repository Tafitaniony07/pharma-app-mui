import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../../accountStore.js";
import { stockInExpired, stockInRupte } from "../../../api/product.js"; // Importer les fonctions pour obtenir les quantités
import ListMenus from "../menu/menu.jsx";

export default function AdminSideBar() {
	// Récupère les informations du compte utilisateur depuis le store
	const { account } = useAccountStore();
	// Hook de navigation
	const navigate = useNavigate();
	// Hook pour obtenir l'emplacement actuel
	const location = useLocation();
	// État pour stocker le nombre de produits périmés
	const [expiredCount, setExpiredCount] = useState(0);
	// État pour stocker le nombre de produits en rupture de stock
	const [outOfStockCount, setOutOfStockCount] = useState(0);

	/**
	 * Vérifie si le chemin donné correspond au chemin actuel
	 * @param {string} path - Le chemin à vérifier
	 * @returns {boolean} - True si le chemin correspond, false sinon
	 */
	const isActive = (path) => location.pathname === path;

	/**
	 * Effet qui charge les compteurs de produits périmés et en rupture
	 * Redirige vers la page d'accueil si l'utilisateur n'est pas gestionnaire
	 */
	useEffect(() => {
		/**
		 * Récupère les données des compteurs depuis l'API
		 */
		const fetchCounts = async () => {
			try {
				const expired = await stockInExpired(); // Récupérer le nombre de médicaments périmés
				console.log("Expired data:", expired.data); // Afficher la réponse de l'API
				const outOfStock = await stockInRupte(); // Récupérer le nombre de médicaments en rupture
				console.log("Out of Stock data:", outOfStock.data); // Afficher la réponse de l'API
				setExpiredCount(expired.data.length); // Supposons que le résultat soit un tableau
				setOutOfStockCount(outOfStock.data.length); // Supposons que le résultat soit un tableau
			} catch (error) {
				console.error("Erreur lors de la récupération des données :", error);
			}
		};

		fetchCounts();
		// Redirige si l'utilisateur n'est pas gestionnaire
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
								{item.path === "/stock_expired_date_admin" ? (
									<Badge badgeContent={expiredCount} color="error">
										{item.icon}
									</Badge>
								) : item.path === "/stock_least_quantity_admin" ? (
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
