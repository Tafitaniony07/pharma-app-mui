import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import NavBar from "../../components/header.jsx";
import FormNewAccount from "../../components/field/formNewAccount.jsx";
import ProprioSideBar from "../proprio/pSideBar.jsx";

const CreateAccount = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2}>
				<Box flex={1}>
					<ProprioSideBar />
				</Box>
				<Box bgcolor="white" borderRadius={5} p={5} mr={2} flex={4}>
					<FormNewAccount />
				</Box>
			</Stack>
		</Box>
	);
};

export default CreateAccount;
