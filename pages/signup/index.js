import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Link from "next/link"
import { TbGasStation } from "react-icons/tb"
import { FaShuttleVan } from "react-icons/fa"
import Footer from "../../components/Footer"
import { useEffect, useState } from "react"
export default function SignUP() {

    const [mobile,setMobile] = useState(false)

    useEffect(() => {
        setMobile(navigator.userAgentData.mobile)
    }, [])

    return (
        <>
            <Head>
                <title>FuelLine | Signup</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon/signup.png" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/signup">signup</Link></>} />

            <div className="w3-content w3-padding">
                <div className="w3-row w3-center w3-padding w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Join the ranks of successful station and vehicle owners by signing up today!
                    </p>
                    <div className="w3-half w3-padding">
                        <Link href="/signup/station-owner" className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left'>
                            STATION OWNER<span style={{ verticalAlign: 'middle' }}> <TbGasStation size={24} /> </span>
                        </Link>
                    </div>
                    <div className="w3-half w3-padding">
                        <Link href="/signup/vehicle-owner" className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left'>
                            VEHICLE OWNER<span style={{ verticalAlign: 'middle' }}> <FaShuttleVan size={24} /> </span>
                        </Link>
                    </div>
                    <p>
                        Already have an account? <Link href="/login">Sign in</Link>
                    </p>
                </div>
            </div>

            {mobile ? <Footer fixed={false}/>:<Footer fixed={true}/>}

        </>
    )

}