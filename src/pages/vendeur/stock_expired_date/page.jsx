import { Box, Stack } from "@mui/material";
import CardExpDate from "../../../components/cardExpDate.jsx";
import NavBar from "../../../components/header.jsx";
import SideBarVendeur from "../side_bar/page.jsx";
const StockExpiredDateVendeur = () => {
	return (
		<>
			<NavBar />
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="stretch"
				gap={2}
				mt={12}
				overflow="-moz-hidden-unscrollable"
			>
				<Box flex={1}>
					<SideBarVendeur />
				</Box>
				<Box bgcolor="white" minHeight="80vh" borderRadius={5} p={3} mr={2} flex={9}>
					{/* <ListMedicamentExpiryDate />
					 */}
					<CardExpDate />
				</Box>
			</Stack>
		</>
	);
};

export default StockExpiredDateVendeur;
