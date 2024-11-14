import { Box, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../../../components/header.jsx";
import ListRuptureStock from "../../../components/stock_state/listRuptureStock.jsx";
import SideBarVendeur from "../side_bar/page.jsx";
const StockLeastQuantityVendeur = () => {
	return (
		<>
			<NavBar />
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="stretch"
				gap={2}
				mt={12}
				overflow="-moz-hidden-unscrollable"
			>
				<Box flex={1}>
					<SideBarVendeur />
				</Box>
				<Box bgcolor="white" borderRadius={5} p={3} mr={3} flex={9}>
					<ListRuptureStock />
				</Box>
			</Stack>
		</>
	);
};

export default StockLeastQuantityVendeur;
