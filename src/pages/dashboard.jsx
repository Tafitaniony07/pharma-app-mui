import { useAccountStore } from "../accountStore";
import AdminDashboard from "./admin/adminDashboard";
import VendeurDashboard from "./vendeur/vendeurDashboard";

export default function Dashboard() {
	const { account } = useAccountStore();
	if (account.account_type === "gestionnaires" || account.account_type === "proprios") return <AdminDashboard />;
	else if (account.account_type === "vendeurs") return <VendeurDashboard />;
	return;
}
