import Head from "next/head"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import { Inter } from '@next/font/google'
export const getServerSideProps = async ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    const DOMAIN = (process.env.ENVIROMENT === 'production') ? 'https://fuelline.vercel.app' : 'http://127.0.0.1:3000'
    const RES = await fetch(`${DOMAIN}/api/all/station-owner`)
    const DATA = await RES.json()
    if (!token) return { props: { AUTH: false, DATA } };
    return { props: { AUTH: true, DATA } };
};

const inter = Inter({ subsets: ['latin'] })
export default function NearMe({ AUTH, DATA }) {


    const [Stations, setStations] = useState(null)

    useEffect(() => {
        setStations(DATA)
    }, [])


    const Sort = (e)=>{
        const One = []
        const Two = []
        const DIST = e.target.value
        Stations.forEach((elements) => {
            if (elements['DISTRICT'] === DIST) One.push(elements)
            else Two.push(elements)
        });
        const Three = One.concat(Two)
        setStations(Three)
    }

    return (
        <>
            <Head>
                <title>FuelLine | NearMe</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/nearme">nearme</Link></>} />

            {
                Stations &&
                <div className={`w3-content w3-padding ${inter.className}`}>
                    <p>
                        <select className="w3-select" onInput={Sort}>
                            {
                                Array.from(new Set(Stations.map(({DISTRICT})=>DISTRICT))).map(E=>(
                                    <option value={E} key={E}>{E}</option>
                                ))
                            }
                        </select>
                    </p>
                    {
                        Stations.map((Station) => (
                            <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge" key={Station['_id']}>
                                <span className="w3-tag w3-right">{Station['DISTRICT']}</span>
                                <h3 className="w3-opacity"><b>{Station['DEALER']}</b></h3>
                                <div className="w3-padding">
                                    {Station['LOCATION']}, {Station['DISTRICT']}, {Station['PROVINCE']}.
                                </div>

                                <div className="w3-padding-large w3-center" style={!window.navigator.userAgentData.mobile?{ width: '70%', margin: 'auto' }:{}}>
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
                                                    <td>{Station['EMAIL']}</td>
                                                </tr>
                                                <tr>
                                                    <td>PHONE</td>
                                                    <td>{Station['CONTACT']}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            }
        </>
    )

}