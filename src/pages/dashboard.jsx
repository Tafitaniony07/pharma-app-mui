import { useAccountStore } from "../accountStore";
import AdminDashboard from "./admin/dashbord/page.jsx";
import ShopProduct from "./vendeur/achat/page.jsx";

/**
 * Composant Dashboard qui gère l'affichage du tableau de bord en fonction du type de compte
 * @returns {JSX.Element|null} Le composant Dashboard approprié selon le type d'utilisateur
 */
export default function Dashboard() {
	// Récupération des informations du compte utilisateur depuis le store global
	const { account } = useAccountStore();

	// Affiche le dashboard administrateur pour les gestionnaires et propriétaires
	if (account.account_type === "gestionnaires" || account.account_type === "proprios") {
		return <AdminDashboard />;
	}
	// Affiche le dashboard vendeur pour les comptes vendeurs
	else if (account.account_type === "vendeurs") {
		return <ShopProduct />;
	}

	// Retourne null si le type de compte n'est pas reconnu
	return null;
}
