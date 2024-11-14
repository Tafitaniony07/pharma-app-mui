import { DateRange, Functions, History, Logout, ProductionQuantityLimitsSharp } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const ListMenus = [
	{
		icon: <DashboardIcon />,
		path: "/",
	},
	{
		icon: <DateRange />,
		path: "/stock_expired_date_vendeur",
	},
	{
		icon: <ProductionQuantityLimitsSharp />,
		path: "/stock_least_quantity_vendeur",
	},
	{
		icon: <History />,
		path: "/list_transaction_vendeur",
	},
	{ icon: <Functions />, path: "/total_transaction_vendeur" },

	{
		icon: <Logout />,
		path: "/logout",
	},
];
export default ListMenus;
