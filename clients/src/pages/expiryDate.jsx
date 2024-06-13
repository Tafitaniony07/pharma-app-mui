import { Box, Stack } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React from "react";
import NavBar from "../components/header.jsx";
import StickyHeadTable from "../components/Table.jsx";
import AdminSideBar from "./admin/adminSideBar.jsx";

const ExpiryDate = () => {
	return (
		<Box mt={13} mb={10}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" gap={3} m={3}>
				<Box sx={{ bgcolor: "white", borderRadius: 5, width: "20%" }}>
					<AdminSideBar />
				</Box>
				<Box sx={{ width: "70%", flexGrow: 1, bgcolor: "white", borderRadius: 5, p: 3 }}>
					<StickyHeadTable />
				</Box>
			</Stack>
		</Box>
	);
};

export default ExpiryDate;
