/* eslint-disable no-useless-catch */
import { myAxiosPrivate } from "./axios";
import { useTokenStore } from "../tokenStore";


export async function ListFournisseur() {
	const { access } = useTokenStore.getState()
	try {
        const res = await myAxiosPrivate.get(`stock/list-fournisseur`, {
            headers: {
                Authorization: `Bearer ${access}`,
			},
		});
        console.log("Fournii", res);
		return res;
	} catch (error) {
		throw error;
	}
}