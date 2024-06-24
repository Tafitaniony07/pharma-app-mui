import { myAxiosPrivate } from "./axios";
import {useTokenStore} from '../tokenStore'

/**
 * 
 * @returns list product
 */
export async function Stock(){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.get(
            'stock/',
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
 * @param {*} product object produit
 * @returns list de produit crée
 */
export async function createProduct(product){
    const {access} = useTokenStore.getState()
    console.log("Access", product);
    try {
        const res = await myAxiosPrivate.post(
            'stock/create-product',
            product,
            {
                headers : {
                    Authorization : `Bearer ${access}`
                }
            }
        )
        console.log(res.data);
        return res
    } catch (error) {
        console.log(error);
        throw error
    }
}
/**
 * 
 * @param {*} stockList list de produit
 * @returns list de produit crée
 */
export async function createStock(stockList){
    const {access} = useTokenStore.getState()
    console.log("Access", access);
    try {
        const res = await myAxiosPrivate.post(
            'stock/create-stock',
            {stockList},
            {
                headers : {
                    Authorization : `Bearer ${access}`
                }
            }
        )
        console.log(res.data);
        return res
    } catch (error) {
        throw error
    }
}
/***
 * @returns list product expiré en 3 mois
 */
export async function StockInExpired(){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.get(
            'stock/list/expired',
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
 * @param {*} id
 * @param {*} data objet à modifier inclus id produit 
 * @returns produit modifier
 */
export async function UpdateProduct(id, data){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.patch(
            `stock/update-product/${id}`,
            {data},
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
 * @param {*} id
 * @param {*} data objet à modifier inclus id produit 
 * @returns produit modifier
 */
export async function DeleteProduct(id, data){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.patch(
            `stock/delete-product/${id}`,
            {data},
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
 * @param {*} data List de {qte_uniter_transaction, qte_gros_transaction, type_transaction,product_id, prix_restant}
 * @argument client  le nom du client Ajouter a la list de data
 * @returns objetct avec message
 */
export async function SellProduct(data){
    const {access} = useTokenStore.getState()
    try {
        const res = await myAxiosPrivate.post(
            `stock/sell-product`,
            {data},
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