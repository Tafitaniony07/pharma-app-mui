import { myAxiosPrivate } from "./axios";
import {useTokenStore} from '../tokenStore'

/**
 * @returns list facture
 */
export async function ListFacture(){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.get(
            `stock/list-facture`,
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
export async function deleteFacture({pk}){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.delete(
            `stock/delete-facture/${pk}`,
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