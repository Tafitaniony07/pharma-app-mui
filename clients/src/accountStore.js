import {create} from 'zustand' 
import { jwtDecode } from "jwt-decode";

export const useAccountStore = create((set)=>({
    account : null,
    setAccount : (token) => set(()=>{
        if (token !== null) {
            console.log("ATO");
            const username = jwtDecode(token)?.username
            const account_type = jwtDecode(token)?.account_type
            return {account : {username, account_type}}
        }
        return { account: null };
    })
}))