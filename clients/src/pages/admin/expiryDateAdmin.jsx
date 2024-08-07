import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import ListMedicamentExpiryDate from "../../components/listMedicamentExpiryDate.jsx";

const ExpiryDateAdmin = () => {
	return (
		<>
			<Box mt={12}>
				<NavBar />
				<Stack direction="row" justifyContent="space-between" alignItems="stretch">
					<Box flex={1}>
						<AdminSideBar />
					</Box>
					<Box bgcolor="white" minHeight="80vh" borderRadius={5} p={5} mb={3} mr={3} flex={4}>
						<ListMedicamentExpiryDate />
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default ExpiryDateAdmin;
