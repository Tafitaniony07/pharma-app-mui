import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddProduct from "../pages/admin/addProduct";
import { TransactionProvider } from "../pages/vendeur/TransactionContext.jsx"; // Importation du contexte
import ExpiryDate from "../pages/expiryDate.jsx";
import VendeurDashboard from "../pages/vendeur/vendeurDashboard.jsx";
import CreateAccount from "../pages/Account/createAccount.jsx";
import AdminDashboard from "../pages/admin/adminDashboard.jsx";
import LostPassword from "../pages/Account/lostPassword.jsx";
import ListTrosa from "../pages/admin/listTrosa.jsx";
import ListTransactions from "../pages/listTransactions.jsx";
import RuptureStock from "../pages/etatStock.jsx";
import Dashboard from "../pages/dashboard.jsx";
import MainLayout from "./Layout.jsx";
export default function Router() {
		return (
			<>
			<MainLayout>
				<TransactionProvider>
					<BrowserRouter>
						<Routes>
							{/* <Route path="/" element={<Login />}></Route> */}
							<Route path="/" element={<Dashboard />}></Route>
							<Route path="/addproduct" element={<AddProduct />}></Route>
							<Route path="/expirydate" element={<ExpiryDate />}></Route>
							<Route path="/create_account" element={<CreateAccount />}></Route>
							{/* <Route path="/vendeur" element={<VendeurDashboard />}></Route> */}
							<Route path="/list_trosa" element={<ListTrosa />}></Route>
							<Route path="/transactions" element={<ListTransactions />}></Route>
							<Route path="/least_stock" element={<RuptureStock />}></Route>
							<Route path="/update_password" element={<LostPassword />}></Route>
						</Routes>
					</BrowserRouter>
				</TransactionProvider>
			</MainLayout>
			
			</>
		)
}
