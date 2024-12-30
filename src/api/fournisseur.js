/* eslint-disable no-useless-catch */
import { useTokenStore } from "../tokenStore";
import { myAxiosPrivate } from "./axios";

export async function ListFournisseur() {
	const { access } = useTokenStore.getState();
	try {
		const res = await myAxiosPrivate.get(`stock/list-fournisseur`, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		// console.log("Fournii", res);
		return res;
	} catch (error) {
		throw error;
	}
}
