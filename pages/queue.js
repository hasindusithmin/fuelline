import Head from "next/head"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Link from "next/link"
import { getCookie } from "cookies-next"
import { useEffect, useState } from "react"
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const getServerSideProps = async ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    if (!token) return { props: { AUTH: false } };
    const DOMAIN = (process.env.ENVIROMENT === 'production') ? 'https://fuelline.vercel.app' : 'http://127.0.0.1:3000'
    const RES = await fetch(`${DOMAIN}/api/verify`, {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    })
    const data = await RES.json()
    return { props: { AUTH: data } };
};

export default function Queue({ AUTH }) {

    const [Queue, setQueue] = useState(null)
    const [Username, setUsername] = useState(null)
    const [Station, setStation] = useState(null)

    useEffect(() => {
        setQueue(AUTH['user']['QUEUE'])
        setQueue(AUTH['user']['FIRSTNAME'] + AUTH['user']['LASTNAME'])
        fetch(`/api/one/station-owner?id=${AUTH['user']['QUEUE']}`)
            .then(res => res.json())
            .then(data => {
                setStation(data)
            })
    }, [])

    const ExitBefore = async()=>{

    }

    const ExitAfter = async()=>{

    }

    return (
        <>

            <Head>
                <title>FuelLine | Queue</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/queue">queue</Link></>} />


            {
                Station &&
                <div className={`w3-content w3-padding ${inter.className}`}>
                    <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge" key={Station['_id']} >
                        <span className="w3-tag w3-right">{Station['DISTRICT']}</span>
                        <h3 className="w3-opacity"><b>{Station['DEALER']}</b></h3>
                        <div className="w3-padding">
                            {Station['LOCATION']}, {Station['DISTRICT']}, {Station['PROVINCE']}.
                        </div>

                        <div className="w3-padding-large w3-center" style={!window.navigator.userAgentData.mobile ? { width: '70%', margin: 'auto' } : {}}>
                            <div className="w3-padding w3-card w3-round-large w3-light-grey w3-margin-bottom w3-responsive">
                                <table className="w3-table w3-bordered">
                                    <caption>Fuel Details</caption>
                                    <thead>
                                        <tr>
                                            <th>DIESEL</th>
                                            <th>PETROL</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{Station['DIESEL']} <code>L</code></td>
                                            <td>{Station['PETROL']} <code>L</code></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {
                                Station['QUEUE'].length > 0 &&
                                <div className="w3-padding w3-card w3-round-large w3-sand w3-margin-bottom w3-responsive">
                                    <table className="w3-table w3-bordered">
                                        <caption>Vehicle Details</caption>
                                        <thead>
                                            <tr>
                                                <th>VEHICLE</th>
                                                <th>QUANTITY</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ['BIKE', '3WHEEL', 'CAR', 'VAN', 'LORRY', 'LAND VEHICLE'].map(VEH => (
                                                    <tr key={VEH}>
                                                        <td>{VEH}</td>
                                                        <td>{Station['QUEUE'].filter(({ VEHICLE }) => VEHICLE === VEH).length}</td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            }
                            <div className="w3-padding w3-card w3-round-large w3-pale-blue w3-margin-bottom w3-responsive">
                                <table className="w3-table w3-bordered">
                                    <caption>Contact Details</caption>
                                    <tbody>
                                        <tr>
                                            <td>EMAIL</td>
                                            <td>
                                                <Link href={`mailto:${Station['EMAIL']}`} style={{ textDecoration: 'none' }}>{Station['EMAIL']}</Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>PHONE</td>
                                            <td>
                                                <Link href={`callto:${Station['CONTACT']}`} style={{ textDecoration: 'none' }} >{Station['CONTACT']}</Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='w3-row w3-center w3-padding w3-margin-bottom'>
                            <div className='w3-half w3-center w3-padding'>
                                <button className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left' onClick={ExitBefore}>
                                    Exit before pump fuel
                                </button>
                            </div>
                            <div className='w3-half w3-center w3-padding'>
                                <button className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left' onClick={ExitAfter}>
                                    Exit after pump fuel
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            }

        </>
    )

}