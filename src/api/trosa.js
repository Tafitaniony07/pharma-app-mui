import { myAxiosPrivate } from "./axios";
import {useTokenStore} from '../tokenStore'
/**
 * @param {*} nom nom du fournisseur
 * @param {*} somme la somme du trosa 
 * @returns Trosa crée
 */
export async function createTrosa({owner, date, montant_restant, contact, adress}){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.post(
            `stock/create-trosa`,
            {owner, date, montant_restant, contact, adress},
            {
                headers : {
                    Authorization : `Bearer ${access}`
                }
            }
        )
        return res
    } catch (error) {
        throw error
    }  
}

/**
 * @returns list facture
 */
export async function ListTrosa(){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.get(
            `stock/list-trosa/`,
            {
                headers : {
                    Authorization : `Bearer ${access}`
                }
            }
        )
        return res
    } catch (error) {
        throw error
    }  
}
/**
 * 
 * @param {*} data data avec pk
 * @returns 
 */
export async function UpdateTrosa(data){
    const { access } = useTokenStore.getState();
	console.log("Update", data);
	try {
		const res = await myAxiosPrivate.patch(`stock/update-trosa/${data.pk}`, data, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		return res;
	} catch (error) {
		throw error;
	}
}

/**
 * 
 * @param {*} id  pk
 * @returns 
 */
export  async function DeleteTrosa(pk){
    const { access } = useTokenStore.getState();
	console.log("delete", pk);
	try {
		const res = await myAxiosPrivate.delete(`stock/delete-trosa/${pk}`, {
			headers: {
				Authorization: `Bearer ${access}`,
			},
		});
		return res;
	} catch (error) {
		throw error;
	}
}