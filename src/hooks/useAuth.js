/* eslint-disable no-useless-catch */
import { useCallback } from "react";
import { useAccountStore } from "../accountStore";
import { Login } from "../api/account";
import { useTokenStore } from "../tokenStore";

export default function useAuth() {
	const { account, setAccount } = useAccountStore();
	const { setAccessToken, setRefreshToken } = useTokenStore();
	const login = useCallback(
		async (username, password) => {
			try {
				const res = await Login(username, password);
				setAccessToken(res.data["access_token"]);
				setRefreshToken(res.data["refresh_token"]);
				setAccount(res.data["access_token"]);
				return res;
			} catch (error) {
				throw error;
			}
		},
		[setAccessToken, setAccount, setRefreshToken]
	);
	const logout = useCallback(() => {
		setAccount(null);
		setAccessToken("");
		setRefreshToken("");
	}, [setAccessToken, setAccount, setRefreshToken]);
	return {
		account,
		login,
		logout,
	};
}
