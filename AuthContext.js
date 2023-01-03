import { createContext, useEffect, useState } from "react"
import { getCookie } from "cookies-next"

const AuthContext = createContext()

export function AuthContextProvider({children}) {

    const [USER,SETUSER] = useState(false)

    useEffect(()=>{
        const JWT = getCookie('JWT')
        if (JWT) {
            fetch('/api/verify',{
                headers:{
                    'Content-Type':'application/json',
                    'token':JWT
                }
            })
                .then(res=>{
                    if (!res.ok) throw Error("unauthorized")
                    return res.json()
                })
                .then(User=>{
                    SETUSER(User)
                })
                .catch(({ERROR})=>{
                    console.log(ERROR);
                })
        }
    },[])

    return (
        <AuthContext.Provider value={USER}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;