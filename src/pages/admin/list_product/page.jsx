/* eslint-disable no-unused-vars */
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import NavBar from "../../../components/header.jsx";
import useAuth from "../../../hooks/useAuth.js";
import ProprioSideBar from "../../proprio/pSideBar.jsx";
import AdminSideBar from "../side_bar/page.jsx";
import AdminListProducts from "./listProducts.jsx";

const ListProductPage = () => {
	// Récupère les informations du compte utilisateur connecté
	const { account } = useAuth();
	// État pour gérer le chargement de la page
	const [isLoading, setIsLoading] = useState(true);

	/**
	 * Effet qui gère l'état de chargement en fonction du compte utilisateur
	 * Met à jour isLoading selon que le compte est chargé ou non
	 */
	useEffect(() => {
		if (account !== null) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [account]);

	return (
		<>
			<Box>
				<NavBar />
				<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2} mt={12}>
					<Box flex={1}>
						{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}
					</Box>
					<Box bgcolor="white" borderRadius={5} p={3} mr={2} flex={4}>
						<AdminListProducts />
					</Box>
				</Stack>
			</Box>
		</>
	);
};
export default ListProductPage;
