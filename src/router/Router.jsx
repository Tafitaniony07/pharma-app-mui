import { BrowserRouter, Route, Routes } from "react-router-dom";
// Account Router Import
import CreateAccount from "../pages/create_account/page.jsx";
import LostPassword from "../pages/lost_password/page.jsx";
// Admin Router Import
import AddProduct from "../pages/admin/add_product/page.jsx";
import ListTransactionsAdmin from "../pages/admin/list_transaction/page.jsx";
import StockExpiredDateAdmin from "../pages/admin/stock_expired_date/page.jsx";
import TotalTransactionAdmin from "../pages/admin/total_transaction/page.jsx";
import ListTrosa from "../pages/admin/trosa/page.jsx";
import Dashboard from "../pages/dashboard.jsx";
// Vendeur Router Import
import ListTransactionVendeur from "../pages/vendeur/list_transaction/page.jsx";
import StockExpiredDateVendeur from "../pages/vendeur/stock_expired_date/page.jsx";

import { ExpiredMedicamentsProvider } from "../contexts/expiredMedicamentsContext.jsx";
import { MedicamentsProvider } from "../contexts/listMedicamentsContext.jsx";
import { OutOfStockProvider } from "../contexts/outOfStockContext.jsx";
import ListProductPage from "../pages/admin/list_product/page.jsx";
import OutOfStockAdmin from "../pages/admin/out_of_stock/page.jsx";
import ShopProduct from "../pages/vendeur/achat/page.jsx";
import OutOfStockVendeur from "../pages/vendeur/out_of_stock/page.jsx";
import { TransactionProvider } from "../pages/vendeur/transaction_context/page.jsx";
import MainLayout from "./Layout.jsx";
export default function Router() {
	return (
		<>
			<MainLayout>
				<TransactionProvider>
					<MedicamentsProvider>
						<OutOfStockProvider>
							<ExpiredMedicamentsProvider>
								<BrowserRouter>
									<Routes>
										<Route path="/" element={<Dashboard />} />
										<Route path="/list_product" element={<ListProductPage />} />

										<Route path="/add_product" element={<AddProduct />} />
										<Route path="/list_transaction_admin" element={<ListTransactionsAdmin />} />
										<Route path="/out_of_stock_admin" element={<OutOfStockAdmin />} />

										<Route path="/stock_expired_date_admin" element={<StockExpiredDateAdmin />} />
										<Route path="/total_transaction_admin" element={<TotalTransactionAdmin />} />

										<Route path="/list_transaction_vendeur" element={<ListTransactionVendeur />} />
										<Route path="/out_of_stock_vendeur" element={<OutOfStockVendeur />} />
										<Route path="/shop" element={<ShopProduct />} />
										<Route
											path="/stock_expired_date_vendeur"
											element={<StockExpiredDateVendeur />}
										/>
										{/* <Route
											path="/total_transaction_vendeur"
											element={<TotalTransactionVendeur />}
										/> */}

										<Route path="/create_account" element={<CreateAccount />} />
										<Route path="/update_password" element={<LostPassword />} />
										<Route path="/list_trosa" element={<ListTrosa />} />
									</Routes>
								</BrowserRouter>
							</ExpiredMedicamentsProvider>
						</OutOfStockProvider>
					</MedicamentsProvider>
				</TransactionProvider>
			</MainLayout>
		</>
	);
}
