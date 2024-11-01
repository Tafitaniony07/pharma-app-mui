import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import ListMedicamentExpiryDate from "../../components/listMedicamentExpiryDate.jsx";
import useAuth from "../../hooks/useAuth.js";
import ProprioSideBar from "../proprio/pSideBar.jsx";

const ExpiryDateAdmin = () => {
	const { account } = useAuth();
	return (
		<>
			<Box mt={12}>
				<NavBar />
				<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2}>
					<Box flex={1}>
						{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}
					</Box>
					<Box bgcolor="white" borderRadius={5} p={3} mr={2} flex={4}>
						<ListMedicamentExpiryDate />
					</Box>
				</Stack>
			</Box>
		</>
	);
};

export default ExpiryDateAdmin;
