import Head from "next/head"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { Inter } from '@next/font/google'
import { useRouter } from "next/router"


export const getServerSideProps = async ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    const DOMAIN = (process.env.NEXT_PUBLIC_ENVIROMENT === 'production') ? 'https://fuelline.vercel.app' : 'http://127.0.0.1:3000'
    // const RES = await fetch(`${DOMAIN}/api/all/station-owner`)
    // const DATA = await RES.json()
    if (!token) return { props: { AUTH: false } };
    const RES = await fetch(`${DOMAIN}/api/verify`, {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    })
    const User = await RES.json()
    if (!RES.ok) return { props: { AUTH: false } };
    return { props: { AUTH: User['user']._id } };
};

const inter = Inter({ subsets: ['latin'] })

export default function NearMe({ AUTH }) {

    const Router = useRouter()


    const [Stations, setStations] = useState(null)
    const [Auth, setAuth] = useState(false)
    const [Queue, setQueue] = useState('')
    const [ERROR, setERROR] = useState('')

    useEffect(() => {
        fetch('/api/all/station-owner')
            .then(res => res.json())
            .then(data => {
                setStations(data)
            })
            .catch(error => {
                console.error(error.message);
            })
        if (AUTH) {
            fetch(`/api/one/vehicle-owner?id=${AUTH}`)
                .then(res => res.json())
                .then(data => {
                    setAuth(data)
                    setQueue(data['QUEUE'])
                })
                .catch(error => {
                    console.error(error.message);
                })
        }
    }, [])


    const SortbyDistrict = (e) => {
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

    const SortbyLocation = (e) => {
        const One = []
        const Two = []
        const LOC = e.target.value
        Stations.forEach((elements) => {
            if (elements['LOCATION'] === LOC) One.push(elements)
            else Two.push(elements)
        });
        const Three = One.concat(Two)
        setStations(Three)
    }

    const SortbyProvice = (e) => {
        const One = []
        const Two = []
        const PROV = e.target.value
        Stations.forEach((elements) => {
            if (elements['PROVINCE'] === PROV) One.push(elements)
            else Two.push(elements)
        });
        const Three = One.concat(Two)
        setStations(Three)
    }

    const Joined = async (e) => {
        try {
            setERROR('')
            const stationId = e.target.id;
            const USERNAME = Auth['FIRSTNAME'] + Auth['LASTNAME']
            const VEHICLE = Auth['VEHICLE']
            const FUEL = Auth['FUEL']
            const QTY = Auth['QTY']
            const USER_ID = Auth['_id']
            const QUEUE = Auth['QUEUE']
            const res = await fetch(`/api/joined-queue/?id=${stationId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ USERNAME, VEHICLE, FUEL, QTY, USER_ID, QUEUE })
            })
            const data = await res.json()
            if (!res.ok) throw Error(data['ERROR'])
            Router.reload()
        } catch (error) {
            setERROR(error.message)
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    return (
        <>
            <Head>
                <title>FuelLine | Nearme</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon/nearme.png" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/nearme">nearme</Link></>} />
            {
                !Stations &&
                <div className={`w3-content w3-padding ${inter.className}`}>
                    Loading ...
                </div>
            }
            {
                Stations &&
                <div className={`w3-content w3-padding ${inter.className}`}>

                    {
                        ERROR && <p className="w3-center w3-large w3-text-red">{ERROR}</p>
                    }

                    {
                        Queue &&
                        <p className="w3-center">
                            <Link href="/queue" className="w3-button w3-blue">See your queue</Link>
                        </p>
                    }

                    <p>
                        <div>Sort By Province</div>
                        <select className="w3-select" onInput={SortbyProvice}>
                            {
                                Array.from(new Set(Stations.map(({ PROVINCE }) => PROVINCE))).map(E => (
                                    <option value={E} key={E}>{E}</option>
                                ))
                            }
                        </select>
                    </p>

                    <p>
                        <div>Sort By District</div>
                        <select className="w3-select" onInput={SortbyDistrict}>
                            {
                                Array.from(new Set(Stations.map(({ DISTRICT }) => DISTRICT))).map(E => (
                                    <option value={E} key={E}>{E}</option>
                                ))
                            }
                        </select>
                    </p>

                    <p>
                        <div>Sort By Location</div>
                        <select className="w3-select" onInput={SortbyLocation}>
                            {
                                Array.from(new Set(Stations.map(({ LOCATION }) => LOCATION))).map(E => (
                                    <option value={E} key={E}>{E}</option>
                                ))
                            }
                        </select>
                    </p>
                    {
                        Stations.map((Station) => (
                            <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge" key={Station['_id']} >
                                <span className="w3-tag w3-round-large">{Station['DISTRICT']}</span>
                                <h3 className="w3-opacity"><b>{Station['DEALER']}</b></h3>
                                <div className="w3-padding">
                                    {Station['LOCATION']}, {Station['DISTRICT']}, {Station['PROVINCE']}.
                                </div>

                                <div className="w3-padding-large w3-center">
                                    <div className="w3-card w3-round-large w3-light-grey w3-margin-bottom w3-responsive">
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
                                        <div className="w3-card w3-round-large w3-sand w3-margin-bottom w3-responsive">
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
                                    <div className="w3-card w3-round-large w3-pale-blue w3-margin-bottom w3-responsive">
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
                                {
                                    Auth &&
                                    <div className="w3-padding">
                                        {
                                            (Queue === Station['_id']) ? <button className="w3-button w3-block w3-teal">Joined</button> : <button id={Station['_id']} onClick={Joined} className="w3-button w3-block w3-red">Joined to the queue</button>
                                        }
                                    </div>
                                }
                            </div>
                        ))
                    }
                </div>
            }
        </>
    )

}