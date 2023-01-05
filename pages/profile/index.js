import { useRouter } from "next/router"
import { useEffect } from "react"


export default function ProfileDefault() {

    const ROUTER = useRouter()
    
    useEffect(()=>{
        ROUTER.replace('/')
    },[])

    return <></>

}