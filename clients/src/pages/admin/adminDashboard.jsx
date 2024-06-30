import { Box, Stack, accordionActionsClasses } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import AdminListProducts from "./adminListProducts.jsx";
import { useEffect } from "react";
import { useAccountStore } from "../../accountStore.js";
import { useTokenStore } from "../../tokenStore.js";
import useAuth from "../../hooks/useAuth.js";
import LoaderMain from "../../components/loader.jsx";
import { useState } from "react";
const AdminDashboard = () => {
	const {account} = useAuth()
	const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log("Rendu", account);
        if (account !== null) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [account])

	return (
		<>
		<Box mt={12}>
			<NavBar />
			<Stack direction="row" justifyContent="space-between" alignItems="stretch">
				<Box flex={1}>
					<AdminSideBar />
				</Box>
				<Box bgcolor="white" minHeight="85vh" borderRadius={5} p={3} mb={3} mr={3} flex={4}>
					<AdminListProducts />
				</Box>
			</Stack>
		</Box>
		</>
	);
};
export default AdminDashboard;
