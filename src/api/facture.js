import { useTokenStore } from "../tokenStore";
import { myAxiosPrivate } from "./axios";

/**
 * @returns list facture
 */
export async function ListFacture() {
	const { access } = useTokenStore.getState();
	try {
		const res = await myAxiosPrivate.get(`stock/list-facture`, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		return res;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

/**
 * @returns list facture
 */
export async function deleteFacture({ pk }) {
	const { access } = useTokenStore.getState();
	try {
		const res = await myAxiosPrivate.delete(`stock/delete-facture/${pk}`, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		return res;
	} catch (error) {
		console.log(error);

		throw error;
	}
}

export async function updateFacture({ pk, data }) {
	const { access } = useTokenStore.getState();
	try {
		const res = await myAxiosPrivate.patch(`stock/update-facture/${pk}`, data, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		return res;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
