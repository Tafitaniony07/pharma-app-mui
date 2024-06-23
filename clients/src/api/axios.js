/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL

import {useTokenStore} from '../tokenStore'
export const myAxios = axios.create({
	baseURL : API_BASE_URL,
	withCredentials : false
})

export const myAxiosPrivate = axios.create({
	baseURL : API_BASE_URL,
	withCredentials : true,
	headers : {
		'Content-Type' : 'application/json',
	}
})

import useRefreshToken from "../hooks/useRefresh";
import { useAccountStore } from "../accountStore";
myAxiosPrivate.interceptors.response.use(
    res=>res,
    async error =>{
        if (error.response.status === 401){
            console.log(error.response.status);
            console.log("config", error?.config);
            const prevRequest = error?.config
            prevRequest.sent = true
            // console.log(prevRequest?.sent);
            const res = await useRefreshToken()
            console.log("NEW TOKEN", res.data);
            console.log(res.status)
            if (res.status === 200){
                const {setAccessToken} = useTokenStore.getState()
                const {setAccount} = useAccountStore.getState()
                prevRequest.headers['Authorization'] = `Bearer ${res.data['access']}`
                setAccessToken(res.data['access'])
                setAccount(res.data['access'])
                console.log("prev request", prevRequest);     
                return myAxiosPrivate(prevRequest);  
            }
        }
        return Promise.reject(error)
    }
)