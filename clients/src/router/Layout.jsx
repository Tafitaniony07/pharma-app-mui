/* eslint-disable react/prop-types */
import useAuth from "../hooks/useAuth.js";
import Login from "../pages/Account/login.jsx";

export default function MainLayout({ children }) {
	const { account } = useAuth();
	if (account === null) {
		return <Login />;
	}
	if (account) {
		return <>{children}</>;
	}
}
