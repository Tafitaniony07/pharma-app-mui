// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../../components/header.jsx";
import { Stack, Box } from "@mui/material";
import SideBarVendeur from "./sideBarVendeur.jsx";
import ListMedicamentsVendeur from "./VendeurTable.jsx";

const VendeurDashboard = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<SideBarVendeur />
				</Box>
				<Box flex={9}>
					<ListMedicamentsVendeur />
				</Box>
			</Stack>
		</Box>
	);
};

export default VendeurDashboard;
