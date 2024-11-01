import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import ListMedicamentExpiryDate from "../../components/listMedicamentExpiryDate.jsx";
import SideBarVendeur from "./sideBarVendeur.jsx";

const ExpiryDateUser = () => {
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
					<ListMedicamentExpiryDate />
				</Box>
			</Stack>
		</>
	);
};

export default ExpiryDateUser;
