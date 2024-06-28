import { myAxios } from "../api/axios";
import {useTokenStore} from '../tokenStore'
export default async function useRefreshToken(){
    const {refresh} = useTokenStore.getState()
    console.log("REFRES", refresh);
    try {
        const res = await myAxios.post('token/refresh',{refresh})
        return res
    } catch (error) {
        throw error
    }

}