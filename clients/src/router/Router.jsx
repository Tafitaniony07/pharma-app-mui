import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddProduct from "../pages/admin/addProduct";
import { TransactionProvider } from "../pages/vendeur/TransactionContext.jsx"; // Importation du contexte
import CreateAccount from "../pages/Account/createAccount.jsx";
import ListTrosa from "../pages/admin/listTrosa.jsx";
import Dashboard from "../pages/dashboard.jsx";
import LostPassword from "../pages/Account/lostPassword.jsx";
import MainLayout from "./Layout.jsx";
import ListTransactionsUser from "../pages/vendeur/listTransactionsUser.jsx";
import ListTransactions from "../pages/admin/listTransactions.jsx";
import ExpiryDateAdmin from "../pages/admin/expiryDateAdmin.jsx";
import ExpiryDateUser from "../pages/vendeur/expiryDateUser.jsx";
import RuptureStockUser from "../pages/vendeur/stockExpiredQuantityUser.jsx";
import RuptureStockAdmin from "../pages/admin/stockExpiredQuantity.jsx";
export default function Router() {
	return (
		<>
			<MainLayout>
				<TransactionProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Dashboard />}></Route>
							<Route path="/addproduct" element={<AddProduct />}></Route>
							<Route path="/expiry_date_user" element={<ExpiryDateUser />}></Route>
							<Route path="/expiry_date_admin" element={<ExpiryDateAdmin />}></Route>
							<Route path="/create_account" element={<CreateAccount />}></Route>
							<Route path="/list_trosa" element={<ListTrosa />}></Route>
							<Route path="/transactions" element={<ListTransactions />}></Route>
							<Route path="/transactions_user" element={<ListTransactionsUser />}></Route>
							<Route path="/stock_expired_quantity" element={<RuptureStockAdmin />}></Route>
							<Route path="/stock_expired_quantity_user" element={<RuptureStockUser />}></Route>
							<Route path="/update_password" element={<LostPassword />}></Route>
						</Routes>
					</BrowserRouter>
				</TransactionProvider>
			</MainLayout>
		</>
	);
}
