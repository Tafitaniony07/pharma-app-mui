import { myAxiosPrivate } from "./axios";
import {useTokenStore} from '../tokenStore'
/**
 * @param {*} nom nom du fournisseur
 * @param {*} somme la somme du trosa 
 * @returns Trosa crée
 */
export async function createTrosa(nom, somme){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.post(
            `stock/list-trosa`,
            {nom, somme},
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
            `stock/list-trosa`,
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
