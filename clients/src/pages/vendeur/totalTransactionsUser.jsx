import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import TransactionSummary from "../../components/transactionSummaryAdmin.jsx";
import SideBarVendeur from "./sideBarVendeur.jsx";

const TotalTransactionUser = () => {
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
						mx: 3,
					}}
					flex={9}
				>
					<TransactionSummary />
				</Box>
			</Stack>
		</Box>
	);
};

export default TotalTransactionUser;
