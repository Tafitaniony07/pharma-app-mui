/* eslint-disable no-unused-vars */
import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import CalendarView from "../../../components/calendar.jsx";
import CardInfo from "../../../components/cardInfo.jsx";
import GraphView from "../../../components/graph.jsx";
import NavBar from "../../../components/header.jsx";
import { useExpiredMedicaments } from "../../../contexts/useExpiredMedicaments.js";
import { useListMedicaments } from "../../../contexts/useListMedicaments.js";
import { useOutOfStock } from "../../../contexts/useOutOfStock.js";
import useAuth from "../../../hooks/useAuth.js";
import ProprioSideBar from "../../proprio/pSideBar.jsx";
import AdminSideBar from "../side_bar/page.jsx";

const AdminDashboard = () => {
	// Récupère les informations du compte utilisateur connecté
	const { account } = useAuth();
	const { productExpired } = useExpiredMedicaments();
	const { products } = useOutOfStock();
	const { medicaments } = useListMedicaments();

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
					<Box mr={2} flex={4}>
						<Stack flexDirection="row" flexGrow={1} gap={2} alignItems="stretch" flexWrap="wrap">
							<CardInfo
								title="Nb de medicaments expirées"
								count={productExpired.length}
								type="Expirées"
								path="/stock_expired_date_admin"
							/>
							<CardInfo
								title="Nb de medicaments en rupture"
								count={products.length}
								type="En rupture"
								path="/out_of_stock_admin"
							/>
							<CardInfo
								title="Total de medicaments en stock "
								count={medicaments.length}
								type="Medicament"
								path="/list_product"
							/>
						</Stack>
						<Stack direction="row" alignItems="stretch" gap={2} mt={2} height={510}>
							<Box bgcolor="secondary.main" borderRadius={5} p={3} flex={2.5}>
								<GraphView />
							</Box>
							<Box
								bgcolor="secondary.main"
								borderRadius={5}
								p={2}
								flex={2}
								display="flex"
								alignItems="center"
								justifyContent="center"
							>
								<CalendarView />
							</Box>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</>
	);
};
export default AdminDashboard;
