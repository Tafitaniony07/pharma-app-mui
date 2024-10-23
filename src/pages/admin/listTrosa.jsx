import { Box, Stack } from "@mui/material";
import NavBar from "../../components/header.jsx";
import AdminSideBar from "./adminSideBar.jsx";
import TrosaItem from "../../components/trosaItem.jsx";
import useAuth from "../../hooks/useAuth.js";
import ProprioSideBar from "../proprio/pSideBar.jsx";

const ListTrosa = () => {
  const {account} = useAuth()
  return (
    <Box mt={12}>
      <NavBar />
      <Stack direction="row" justifyContent="space-between" alignItems="start">
        <Box flex={1}>
          {account.account_type === 'gestionnaires'? <AdminSideBar /> : <ProprioSideBar />} 
        </Box>
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 5,
            p: 5,
            mr: 3,
          }}
          flex={4}
        >
          <TrosaItem />
        </Box>
      </Stack>
    </Box>
  );
};

export default ListTrosa;
