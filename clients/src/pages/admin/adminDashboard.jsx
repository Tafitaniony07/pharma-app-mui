import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import AdminListProducts from "./adminListProducts.jsx";

const AdminDashboard = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<AdminSideBar />
				</Box>
				<Box bgcolor="white" minHeight="85vh" borderRadius={5} p={3} mb={3} mr={3} flex={4}>
					<AdminListProducts />
				</Box>
			</Stack>
		</Box>
	);
};
export default AdminDashboard;
