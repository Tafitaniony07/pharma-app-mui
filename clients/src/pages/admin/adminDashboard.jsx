import { Box, Stack, accordionActionsClasses } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import AdminListProducts from "./adminListProducts.jsx";
import { useEffect } from "react";
import { Stock } from "../../api/product.js";
import { useAccountStore } from "../../accountStore.js";
import { useTokenStore } from "../../tokenStore.js";

const AdminDashboard = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<AdminSideBar />
				</Box>
				<Box bgcolor="white" height="85vh" borderRadius={5} p={3} mb={3} mr={3} flex={4}>
					<AdminListProducts />
				</Box>
			</Stack>
		</Box>
	);
};
export default AdminDashboard;
