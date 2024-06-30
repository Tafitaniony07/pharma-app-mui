import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormNewAccount from "../../components/formNewAccount.jsx";
import AdminSideBar from "../admin/adminSideBar.jsx";
import NavBar from "../../components/header.jsx";
import useAuth from "../../hooks/useAuth.js";
import LoaderMain from "../../components/loader.jsx";

const CreateAccount = () => {
	const {account} = useAuth()

	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<AdminSideBar />
				</Box>
				<Box bgcolor="white" height="85vh" borderRadius={5} p={5} mb={3} mr={3} flex={4}>
					<FormNewAccount />
				</Box>
			</Stack>
		</Box>
	);
};

export default CreateAccount;
