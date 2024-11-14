// eslint-disable-next-line no-unused-vars
import { Box, Stack } from "@mui/material";
import NavBar from "../../../components/header.jsx";
import SideBarVendeur from "../side_bar/page.jsx";
import ListMedicamentsVendeur from "../vente_dashbord/page.jsx";

const VendeurDashboard = () => {
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
				<Box flex={9}>
					<ListMedicamentsVendeur />
				</Box>
			</Stack>
		</>
	);
};

export default VendeurDashboard;
