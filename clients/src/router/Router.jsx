import { Routes, Route, BrowserRouter } from "react-router-dom";
import AddProduct from "../pages/admin/addProduct";
import { TransactionProvider } from "../pages/vendeur/TransactionContext.jsx"; // Importation du contexte
import ExpiryDate from "../pages/expiryDate.jsx";
import VendeurDashboard from "../pages/vendeur/vendeurDashboard.jsx";
import Trosa from "../components/Trosa.jsx";
import Transaction from "../pages/admin/transaction.jsx";
import Login from "../pages/Account/login.jsx";
import CreateAccount from "../pages/Account/createAccount.jsx";
import AdminDashboard from "../pages/admin/adminDashboard.jsx";

export default function Router() {
	return (
		<TransactionProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/admin_dashboard" element={<AdminDashboard />}></Route>
					<Route path="/addproduct" element={<AddProduct />}></Route>
					<Route path="/expirydate" element={<ExpiryDate />}></Route>
					<Route path="/create_account" element={<CreateAccount />}></Route>
					<Route path="/vendeur" element={<VendeurDashboard />}></Route>
					<Route path="/trosa" element={<Trosa />}></Route>
					<Route path="/list_transaction" element={<Transaction />}></Route>
				</Routes>
			</BrowserRouter>
		</TransactionProvider>
	);
}
