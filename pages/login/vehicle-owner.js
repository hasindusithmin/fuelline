import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import validator from "validator"
import { useEffect, useState } from "react"
import Link from "next/link"
export default function VehicleOwner() {
    

    const [EMAIL,SETEMAIL] = useState('')
    const [PASSWORD,SETPASSWORD] = useState('')
    const [ERROR,SETERROR] = useState('')
    const [mobile,setMobile] = useState(false)

    useEffect(() => {
        setMobile(navigator.userAgentData.mobile)
    }, [])

    const LOGIN = async()=>{
        try {
            SETERROR('')
            // START VALIDATION
            if (EMAIL === '') throw new Error("Email should't empty.")
            if (PASSWORD === '') throw new Error("Password should't empty.")
            if (!validator.isEmail(EMAIL)) throw new Error("Enter valid email")
            if (!validator.isStrongPassword(PASSWORD)) throw new Error("Enter strong password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
            // END VALIDATION
            const res = await fetch('/api/login/vehicle-owner',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({EMAIL,PASSWORD})
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data['ERROR'])
            window.location.replace('/')
        } catch (error) {
            SETERROR(error.message)
        }
    }

    return (
        <>
            <Head>
                <title>Login | Vehicle Owner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon/vehicle-owner.png" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/login">login</Link>➤<Link href="/login/vehicle-owner">vehicle-owner</Link></>} />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Experience the benefits of being in the driver's seat as the vehicle owner!
                    </p>

                    {ERROR && <p className="w3-text-red" ><b>{ERROR}</b></p>}

                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email address..." value={EMAIL} onInput={e=>SETEMAIL(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <input type="password" className="w3-input w3-border w3-round-large" placeholder="Enter your password..." value={PASSWORD} onInput={e=>SETPASSWORD(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <button className="w3-button w3-round w3-black" onClick={LOGIN}>LOGIN</button>
                    </div>
                </div>
            </div>

            {mobile ? <Footer fixed={false}/>:<Footer fixed={true}/>}
        </>
    )

}