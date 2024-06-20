// eslint-disable-next-line no-unused-vars
import { Box, Stack } from "@mui/material";
import NavBar from "../components/header";
import FormTrosa from "./formTrosa.jsx";
import AdminSideBar from "../pages/admin/adminSideBar";

const Trosa = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="start">
				<Box sx={{ bgcolor: "white", borderRadius: 5 }} flex={1}>
					<AdminSideBar />
				</Box>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 5,
						p: 5,
						mr: 3,
					}}
					flex={4}
				>
					<FormTrosa />
				</Box>
			</Stack>
		</Box>
	);
};

export default Trosa;
