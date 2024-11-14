import { BrowserRouter, Route, Routes } from "react-router-dom";
// Account Router Import
import CreateAccount from "../pages/create_account/page.jsx";
import LostPassword from "../pages/lost_password/page.jsx";
// Admin Router Import
import AddProduct from "../pages/admin/add_product/page.jsx";
import ListTransactionsAdmin from "../pages/admin/list_transaction/page.jsx";
import StockExpiredDateAdmin from "../pages/admin/stock_expired_date/page.jsx";
import StockLeastQuantityAdmin from "../pages/admin/stock_least_quantity/page.jsx";
import TotalTransactionAdmin from "../pages/admin/total_transaction/page.jsx";
import ListTrosa from "../pages/admin/trosa/page.jsx";
import Dashboard from "../pages/dashboard.jsx";
// Vendeur Router Import
import ListTransactionVendeur from "../pages/vendeur/list_transaction/page.jsx";
import StockExpiredDateVendeur from "../pages/vendeur/stock_expired_date/page.jsx";
import StockLeastQuantityVendeur from "../pages/vendeur/stock_least_quantity/page.jsx";
import TotalTransactionVendeur from "../pages/vendeur/total_transaction/page.jsx";
import { TransactionProvider } from "../pages/vendeur/transaction_context/page.jsx";

import MainLayout from "./Layout.jsx";
export default function Router() {
	return (
		<>
			<MainLayout>
				<TransactionProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Dashboard />}></Route>

							<Route path="/add_product" element={<AddProduct />}></Route>
							<Route path="/list_transaction_admin" element={<ListTransactionsAdmin />}></Route>
							<Route path="/stock_least_quantity_admin" element={<StockLeastQuantityAdmin />}></Route>
							<Route path="/stock_expired_date_admin" element={<StockExpiredDateAdmin />}></Route>
							<Route path="/total_transaction_admin" element={<TotalTransactionAdmin />}></Route>

							<Route path="/list_transaction_vendeur" element={<ListTransactionVendeur />}></Route>
							<Route path="/stock_least_quantity_vendeur" element={<StockLeastQuantityVendeur />}></Route>
							<Route path="/stock_expired_date_vendeur" element={<StockExpiredDateVendeur />}></Route>
							<Route path="/total_transaction_vendeur" element={<TotalTransactionVendeur />}></Route>

							<Route path="/create_account" element={<CreateAccount />}></Route>
							<Route path="/update_password" element={<LostPassword />}></Route>
							<Route path="/list_trosa" element={<ListTrosa />}></Route>
						</Routes>
					</BrowserRouter>
				</TransactionProvider>
			</MainLayout>
		</>
	);
}
