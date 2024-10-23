import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import ListMedicamentExpiryDate from "../../components/listMedicamentExpiryDate.jsx";
import SideBarVendeur from "./sideBarVendeur.jsx";

const ExpiryDateUser = () => {
	return (
		<>
			<Box mt={12}>
				<NavBar />
				<Stack direction="row" justifyContent="space-between" alignItems="stretch">
					<Box flex={1}>
						<SideBarVendeur />
					</Box>
					<Box bgcolor="white" minHeight="80vh" borderRadius={5} p={5} mb={3} mx={3} flex={9}>
						<ListMedicamentExpiryDate />
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default ExpiryDateUser;
