import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/login.jsx";
import Dashboard from "../pages/admin/dashboard.jsx";
import SignUp from "../pages/signUp.jsx";
import AddProduct from "../pages/admin/addProduct";
import { TransactionProvider } from "../pages/vendeur/TransactionContext.jsx"; // Importation du contexte
import ExpiryDate from "../pages/expiryDate.jsx";
import VendeurDashboard from "../pages/vendeur/vendeurDashboard.jsx";
import Trosa from "../components/Trosa.jsx";

export default function Router() {
	return (
		<TransactionProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/signup" element={<SignUp />}></Route>
					<Route path="/dashboard" element={<Dashboard />}></Route>
					<Route path="/addproduct" element={<AddProduct />}></Route>
					<Route path="/expirydate" element={<ExpiryDate />}></Route>
					<Route path="/create_account" element={<SignUp />}></Route>
					<Route path="/achat" element={<VendeurDashboard />}></Route>
					<Route path="/trosa" element={<Trosa />}></Route>
				</Routes>
			</BrowserRouter>
		</TransactionProvider>
	);
}
