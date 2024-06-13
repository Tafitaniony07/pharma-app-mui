// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Stack } from "@mui/material";
import SideBar from "../../components/adminSideBar.jsx";
import NavBar from "../../components/header.jsx";
import SignUp from "../signUp.jsx";

const CreateAccount = () => {
	return (
		<Box mt={13} mb={10}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" gap={3} m="25px">
				<Box sx={{ bgcolor: "white", borderRadius: 5 }} flex={1}>
					<SideBar />
				</Box>
				<Box sx={{ bgcolor: "white", borderRadius: 5 }} p={5} flex={4} >
					<SignUp />
				</Box>
			</Stack>
		</Box>
	);
};

export default CreateAccount;
