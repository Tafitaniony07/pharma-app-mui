// /* eslint-disable no-unused-vars */
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import AdminSideBar from "../admin/adminSideBar.jsx";
import NavBar from "../../components/header.jsx";
import useAuth from "../../hooks/useAuth.js";
import UpdatePasswordForm from "../../components/field/updatePasswordForm.jsx";
import ProprioSideBar from "../proprio/pSideBar.jsx";
const forgot_password = "/account.svg";

const LostPassword = () => {
	const { account } = useAuth();
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2}>
				<Box flex={1}>{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}</Box>
				<Box
					sx={{ display: "flex", flexDirection: "row", gap: 10 }}
					bgcolor="white"
					borderRadius={5}
					p={5}
					flex={4}
					mr={2}
				>
					<UpdatePasswordForm />
					<img src={forgot_password} width="70%" height="100%" />
				</Box>
			</Stack>
		</Box>
	);
};

export default LostPassword;
