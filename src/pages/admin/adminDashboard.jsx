/* eslint-disable no-unused-vars */
import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import AdminListProducts from "./adminListProducts.jsx";
import { useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
import { useState } from "react";
import ProprioSideBar from "../proprio/pSideBar.jsx";
const AdminDashboard = () => {
	const { account } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (account !== null) {
			setIsLoading(false);
		} else {
			setIsLoading(true);
		}
	}, [account]);

	return (
		<>
			<Box>
				<NavBar />
				<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2} mt={12}>
					<Box flex={1}>
						{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}
					</Box>
					<Box bgcolor="white" borderRadius={5} p={3} mr={2} flex={4}>
						<AdminListProducts />
					</Box>
				</Stack>
			</Box>
		</>
	);
};
export default AdminDashboard;
