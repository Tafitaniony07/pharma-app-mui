import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
export const useTokenStore = create(
    devtools(
        persist(
            (set, get)=>({
                access: "",
                refresh: "",
                setAccessToken : (newAccessToken)=>set(()=>{
                    return {access : newAccessToken}
                }),
                setRefreshToken : (newRefresh) => set(()=>({refresh : newRefresh})),

            })
        , {name : 'token'})
    ))