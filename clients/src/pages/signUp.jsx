import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import FormNewAccount from "../components/formNewAccount.jsx";
import AdminSideBar from "./admin/adminSideBar.jsx";
import NavBar from "../components/header.jsx";

const SignUp = () => {
	return (
		<Box mt={13}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" gap={3} m="25px">
				<Box sx={{ bgcolor: "white", borderRadius: 5 }} flex={1}>
					<AdminSideBar />
				</Box>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 5,
						p: 5,
					}}
					flex={4}
				>
					<FormNewAccount />
				</Box>
			</Stack>
		</Box>
	);
};

export default SignUp;
