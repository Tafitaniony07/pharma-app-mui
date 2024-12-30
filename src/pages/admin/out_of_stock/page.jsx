import { Box, Stack } from "@mui/material";
import CardOutOfStock from "../../../components/cardOutOfStock.jsx";
import NavBar from "../../../components/header.jsx";
import useAuth from "../../../hooks/useAuth.js";
import ProprioSideBar from "../../proprio/pSideBar.jsx";
import AdminSideBar from "../side_bar/page.jsx";

const OutOfStockAdmin = () => {
	const { account } = useAuth();

	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2}>
				<Box flex={1}>{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}</Box>
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={4}>
					{/* <ListRuptureStock /> */}
					<CardOutOfStock />
				</Box>
			</Stack>
		</Box>
	);
};

export default OutOfStockAdmin;
