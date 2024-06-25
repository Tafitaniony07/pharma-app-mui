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