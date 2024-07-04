import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import TransactionItem from "../../components/transactionItem.jsx";
import SideBarVendeur from "./sideBarVendeur.jsx";

const ListTransactionsUser = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="start">
				<Box flex={1}>
					<SideBarVendeur />
				</Box>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 5,
						p: 5,
						mr: 3,
					}}
					flex={7}
				>
					<TransactionItem />
				</Box>
			</Stack>
		</Box>
	);
};

export default ListTransactionsUser;
