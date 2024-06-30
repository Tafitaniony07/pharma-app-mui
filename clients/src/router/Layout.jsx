import LoaderMain from "../components/loader.jsx";
import useAuth from "../hooks/useAuth.js";
import Login from "../pages/Account/login.jsx";
import { useEffect } from "react";


export default function MainLayout({children}){
    const {account} = useAuth()
	console.log("Account", account);
	if (account === null){
		return (<Login />)
	}
	if (account){
    return (
        <>
            {children}
        </>
    )}
}