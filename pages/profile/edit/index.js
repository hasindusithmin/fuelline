
import { useRouter } from "next/router"
import { useEffect } from "react"


export default function ProfileEditDefault() {

    const ROUTER = useRouter()
    
    useEffect(()=>{
        ROUTER.back()
    },[])

    return <></>

}