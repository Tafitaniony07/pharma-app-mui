import { DateRange, History, Logout, ProductionQuantityLimitsSharp, ShoppingBasketOutlined } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";

const ListMenus = [
	{
		icon: <DashboardIcon />,
		path: "/",
	},
	{ icon: <ShoppingBasketOutlined />, path: "/shop" },

	{
		icon: <DateRange />,
		path: "/stock_expired_date_vendeur",
	},
	{
		icon: <ProductionQuantityLimitsSharp />,
		path: "/out_of_stock_vendeur",
	},
	{
		icon: <History />,
		path: "/list_transaction_vendeur",
	},
	// { icon: <Functions />, path: "/total_transaction_vendeur" },

	{
		icon: <Logout />,
		path: "/logout",
	},
];
export default ListMenus;
