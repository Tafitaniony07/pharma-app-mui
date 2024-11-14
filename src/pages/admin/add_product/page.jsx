// eslint-disable-next-line no-unused-vars
import { Box, Stack } from "@mui/material";
import AddProductForm from "../../../components/field/addProductForm.jsx";
import NavBar from "../../../components/header.jsx";
import SideBar from "../side_bar/page.jsx";
const AddProduct = () => {
	return (
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch" gap={2}>
				<Box flex={1}>
					<SideBar />
				</Box>
				<Box mr={2} flex={4}>
					<AddProductForm />
				</Box>
			</Stack>
		</Box>
	);
};

export default AddProduct;
