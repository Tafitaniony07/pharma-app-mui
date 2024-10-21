import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import {
  DateRange,
  Functions,
  History,
  MoneyOff,
  Password,
  Person,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useAccountStore } from "../../accountStore";

export default function ProprioSideBar() {
  const { account } = useAccountStore();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const menuItems = [
    { text: "DashBoard", icon: <DashboardIcon />, path: "/" },
    {
      text: "D. Peremption",
      icon: <DateRange />,
      path: "/expiry_date_admin",
    },
    {
      text: "Etat de Stock",
      icon: <ProductionQuantityLimitsOutlined />,
      path: "/stock_expired_quantity",
    },
    {
      text: "Transactions",
      icon: <History />,
      path: "/transactions",
    },
    {
      text: "Total Transactions",
      icon: <Functions />,
      path: "/total_transactions",
    },
    { text: "Compte", icon: <Person />, path: "/create_account" },
    { text: "Update Password", icon: <Password />, path: "/update_password" },
    { text: "Trosa", icon: <MoneyOff />, path: "/list_trosa" },
  ];
  useEffect(() => {
	console.log(account.account_type);
    if (account.account_type !== 'proprios') navigate("/")
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        borderRadius: 5,
        position: "fixed",
        height: "100vh",
      }}
    >
      <List sx={{ width: "100%", my: 3 }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            sx={{ display: "block" }}
            onClick={() => navigate(item.path)}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "initial",
                px: 5,
                mt: index === 0 ? 0 : 2.5,
                color: isActive(item.path) ? "#4d4373" : "inherit",
                borderRight: isActive(item.path) ? "4px solid #4d4373" : "none",
                backgroundColor: isActive(item.path)
                  ? "rgba(58, 0, 128, 0.025)"
                  : "transparent",
                transition: "transform 0.8s ease",
                "&:hover": {
                  transform: "translateX(10px)", // Légère mise à l'échelle
                  borderColor: "secondary.main", // Couleur de la bordure lors du survol
                  cursor: "pointer",
                  background: "#fff",
                  borderRadius: 1,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  color: isActive(item.path) ? "#4d4373" : "inherit",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: 1 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
