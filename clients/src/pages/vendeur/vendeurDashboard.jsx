// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../../components/header.jsx";
import { Stack, Box } from "@mui/material";
import SideBarVendeur from "./sideBarVendeur.jsx";
import ListMedicamentsVendeur from "./listVendeur.jsx";

const VendeurDashboard = () => {
	return (
		<Box mt={13} mb={10}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" gap={3} m={3}>
				<Box sx={{ bgcolor: "white", borderRadius: 5, width: "15%" }}>
					<SideBarVendeur />
				</Box>
				<Box sx={{ width: "65%", bgcolor: "white", flexGrow:1, borderRadius: 5, p: 5 }}>
					<ListMedicamentsVendeur />
				</Box>
			</Stack>
		</Box>
	);
};

export default VendeurDashboard;
