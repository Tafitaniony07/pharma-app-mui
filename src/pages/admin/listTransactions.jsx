import { Box, Stack } from "@mui/material";
import AdminSideBar from "./adminSideBar.jsx";
import TransactionItem from "../../components/transactionItem.jsx";
import NavBar from "../../components/header.jsx";
import ProprioSideBar from "../proprio/pSideBar.jsx";
import useAuth from "../../hooks/useAuth.js";

const ListTransactions = () => {
	const { account } = useAuth();
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="strech" gap={2}>
				<Box flex={1}>{account.account_type === "gestionnaires" ? <AdminSideBar /> : <ProprioSideBar />}</Box>
				<Box
					sx={{
						bgcolor: "white",
						borderRadius: 5,
						p: 5,
						mr: 2,
						// Activer le défilement vertical
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
