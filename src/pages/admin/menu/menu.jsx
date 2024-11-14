import {
	DateRange,
	Functions,
	History,
	MoneyOff,
	Password,
	ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

const ListMenus = [
	{ text: "DashBoard", icon: <DashboardIcon />, path: "/" },
	{ text: "Ajout Produit", icon: <AddCircleIcon />, path: "/add_product" },
	{
		text: "Stock Périmé",
		icon: <DateRange />,
		path: "/stock_expired_date_admin",
	},
	{
		text: "Stock en Rupture",
		icon: <ProductionQuantityLimitsOutlined />,
		path: "/stock_least_quantity_admin",
	},
	{
		text: "Transactions",
		icon: <History />,
		path: "/list_transaction_admin",
	},
	{
		text: "Total Transactions",
		icon: <Functions />,
		path: "/total_transaction_admin",
	},
	{ text: "Changer Mdp", icon: <Password />, path: "/update_password" },
	{ text: "Trosa", icon: <MoneyOff />, path: "/list_trosa" },
];
export default ListMenus;
