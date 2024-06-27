import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import TrosaItem from "../../components/trosaItem.jsx";

const ListTrosa = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="start">
				<Box flex={1}>
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
					<TrosaItem />
				</Box>
			</Stack>
		</Box>
	);
};

export default ListTrosa;
