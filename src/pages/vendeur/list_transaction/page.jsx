import { Box, Stack } from "@mui/material";
import NavBar from "../../../components/header.jsx";
import TransactionItem from "../../../components/transaction/transactionItem.jsx";
import SideBarVendeur from "../side_bar/page.jsx";
const ListTransactionVendeur = () => {
	return (
		<Box>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" mt={12}>
				<Box flex={1}>
					<SideBarVendeur />
				</Box>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 5,
						p: 5,
						mx: 3,
					}}
					flex={9}
				>
					<TransactionItem />
				</Box>
			</Stack>
		</Box>
	);
};

export default ListTransactionVendeur;
