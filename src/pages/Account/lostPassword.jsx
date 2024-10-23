/* eslint-disable no-unused-vars */
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import AdminSideBar from "../admin/adminSideBar.jsx";
import NavBar from "../../components/header.jsx";
import useAuth from "../../hooks/useAuth.js";
import FormNewAccount from "../../components/field/formNewAccount.jsx";
import { Update } from "@mui/icons-material";
import UpdatePasswordForm from "../../components/field/updatePasswordForm.jsx";
import ProprioSideBar from "../proprio/pSideBar.jsx";

const LostPassword = () => {
	const { account } = useAuth();
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between">
				<Box flex={1}>
				{account.account_type === 'gestionnaires'? <AdminSideBar /> : <ProprioSideBar />} 
				</Box>
				<Box bgcolor="white" borderRadius={5} p={5} mb={3} mr={3} flex={4}>
					<UpdatePasswordForm />
				</Box>
			</Stack>
		</Box>
	);
};

export default LostPassword;
