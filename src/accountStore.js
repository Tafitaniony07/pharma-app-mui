import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import { persist } from "zustand/middleware";
export const useAccountStore = create(
	persist(
		(set, get) => ({
			account: null,
			setAccount: (token) =>
				set(() => {
					if (token !== null) {
						// console.log("ATO");
						const username = jwtDecode(token)?.username;
						const account_type = jwtDecode(token)?.account_type;
						return { account: { username, account_type } };
					}
					return { account: null };
				}),
		}),
		{ name: "account" }
	)
);
