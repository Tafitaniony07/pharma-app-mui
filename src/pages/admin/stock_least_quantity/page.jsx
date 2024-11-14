import { Box, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../../../components/header.jsx";
import ListRuptureStock from "../../../components/stock_state/listRuptureStock.jsx";
import useAuth from "../../../hooks/useAuth.js";
import ProprioSideBar from "../../proprio/pSideBar.jsx";
import AdminSideBar from "../side_bar/page.jsx";

const StockLeastQuantityAdmin = () => {
	const { account } = useAuth();
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2}>
				<Box flex={1}>{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}</Box>
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={4}>
					<ListRuptureStock />
				</Box>
			</Stack>
		</Box>
	);
};

export default StockLeastQuantityAdmin;
