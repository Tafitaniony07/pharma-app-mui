// eslint-disable-next-line no-unused-vars
import React from "react";
import { Box, Stack } from "@mui/material";
import SideBar from "../admin/adminSideBar.jsx";
import NavBar from "../../components/header.jsx";
import AddProductForm from "../../components/field/addProductForm.jsx";
const AddProduct = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<SideBar />
				</Box>
				<Box mb={3} mr={3} flex={4}>
					<AddProductForm />
				</Box>
			</Stack>
		</Box>
	);
};

export default AddProduct;
