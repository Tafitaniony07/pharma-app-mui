import { Box, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../components/header.jsx";
import AdminSideBar from "./admin/adminSideBar.jsx";
import ListRuptureStock from "../components/listRuptureStock.jsx";

const RuptureStock = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<AdminSideBar />
				</Box>
				<Box bgcolor="white" minHeight="80vh" borderRadius={5} p={5} mb={3} mr={3} flex={4}>
					<ListRuptureStock />
				</Box>
			</Stack>
		</Box>
	);
};

export default RuptureStock;
