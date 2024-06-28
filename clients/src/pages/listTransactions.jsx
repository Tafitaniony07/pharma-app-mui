import { Box, Stack } from "@mui/material";
import TransactionItem from "../components/transactionItem.jsx";
import NavBar from "../components/header.jsx";
import AdminSideBar from "./admin/adminSideBar.jsx";

const ListTransactions = () => {
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
					<TransactionItem />
				</Box>
			</Stack>
		</Box>
	);
};

export default ListTransactions;
