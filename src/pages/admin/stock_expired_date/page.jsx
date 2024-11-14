import { Box, Stack } from "@mui/material";
import NavBar from "../../../components/header.jsx";
import ListMedicamentExpiryDate from "../../../components/stock_state/listMedicamentExpiryDate.jsx";
import useAuth from "../../../hooks/useAuth.js";
import ProprioSideBar from "../../proprio/pSideBar.jsx";
import AdminSideBar from "../side_bar/page.jsx";

const StockExpiredDateAdmin = () => {
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

export default StockExpiredDateAdmin;
