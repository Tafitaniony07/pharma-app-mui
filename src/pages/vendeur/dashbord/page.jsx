/* eslint-disable no-unused-vars */
import { Box, Stack } from "@mui/material";
import CalendarView from "../../../components/calendar.jsx";
import CardInfo from "../../../components/cardInfo.jsx";
import NavBar from "../../../components/header.jsx";
import TransactionSummary from "../../../components/transaction/transactionSummaryAdmin.jsx";
import { useExpiredMedicaments } from "../../../contexts/useExpiredMedicaments.js";
import { useListMedicaments } from "../../../contexts/useListMedicaments.js";
import { useOutOfStock } from "../../../contexts/useOutOfStock.js";
import SideBarVendeur from "../side_bar/page.jsx";

const VendeurDashboard = () => {
	// Récupère les informations du compte utilisateur connecté
	const { productExpired } = useExpiredMedicaments();
	const { products } = useOutOfStock();
	const { medicaments } = useListMedicaments();

	return (
		<>
			<Box>
				<NavBar />
				<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2} mt={12}>
					<Box flex={1}>
						<SideBarVendeur />
					</Box>
					<Box mr={2} flex={9}>
						<Stack flexDirection="row" flexGrow={1} gap={2} alignItems="stretch" flexWrap="wrap">
							<CardInfo
								title="Nb de medicaments expirées"
								count={productExpired.length}
								type="Expirées"
								path="/stock_expired_date_vendeur"
							/>
							<CardInfo
								title="Nb de medicaments en rupture"
								count={products.length}
								type="En rupture"
								path="/out_of_stock_vendeur"
							/>
							<CardInfo
								title="Total de medicaments en stock "
								count={medicaments.length}
								type="Medicament"
								path="/"
							/>
						</Stack>
						<Stack direction="row" alignItems="stretch" gap={2} mt={2}>
							<Box
								bgcolor="white"
								borderRadius={5}
								p={2}
								alignItems="start"
								flexDirection="column"
								justifyContent="center"
								flex={0.94}
							>
								<TransactionSummary />
							</Box>
							<Box
								bgcolor="secondary.main"
								borderRadius={5}
								p={2}
								display="flex"
								alignItems="center"
								justifyContent="center"
								flex={2}
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
export default VendeurDashboard;
