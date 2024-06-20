import { Box, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../components/header.jsx";
import StickyHeadTable from "../components/Table.jsx";
import AdminSideBar from "./admin/adminSideBar.jsx";

const ExpiryDate = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<AdminSideBar />
				</Box>
				<Box bgcolor="white" height="85vh" borderRadius={5} p={3} mb={3} mr={3} flex={4}>
					<StickyHeadTable />
				</Box>
			</Stack>
		</Box>
	);
};

export default ExpiryDate;
