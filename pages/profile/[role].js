import Head from "next/head";
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import Header from "../../components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
export const getServerSideProps = async ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    if (!token) return { props: { AUTH: false } };
    const DOMAIN = (process.env.NEXT_PUBLIC_ENVIROMENT === 'production') ? 'https://fuelline.vercel.app' : 'http://127.0.0.1:3000'
    const RES = await fetch(`${DOMAIN}/api/verify`, {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    })
    const USER = await RES.json()
    if (!RES.ok) return { props: { AUTH: false } };
    return { props: { AUTH: { id: USER['user']._id, role: USER['role'] } } };
};

export default function Profile({ AUTH }) {

    const ROUTER = useRouter()

    const [USER, SET_USER] = useState(null)

    if (!AUTH) {
        ROUTER.replace('/')
    }

    const forbidden = ['_id', 'PASSWORD', '__v', 'QUEUE']

    useEffect(() => {
        const URL = (AUTH['role'] === 'vehicle') ? `/api/one/vehicle-owner?id=${AUTH['id']}` : `/api/one/station-owner?id=${AUTH['id']}`
        fetch(URL)
            .then(res => res.json())
            .then(data => {
                SET_USER(data)
            })
            .catch(error => {
                console.error(error.message);
            })
    }, [])



    return (
        <>
            <Head>
                <title>FuelLine | Profile</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header where={<><Link href="/">home</Link>➤<Link href="/profile">profile</Link>➤<Link href={`/profile/${AUTH['role']}`}>{AUTH['role']}</Link></>} />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    {
                        !USER && <div>Loading ...</div>
                    }
                    {
                        USER &&
                        <table className="w3-table-all">
                            <tbody>
                                {
                                    Object.entries(USER).map(([key, value]) => {
                                        if (!forbidden.includes(key)) {
                                            return (
                                                <tr key={key}>
                                                    <td><b>{key}</b></td>
                                                    <td>{value}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    }
                    {
                        USER && AUTH['role'] === 'station' && USER['QUEUE'].length > 0 &&
                        <table className="w3-table-all">
                            <caption><b>QUEUE</b></caption>
                            <thead>
                                <tr>
                                    <th>USERNAME</th>
                                    <th>VEHICLE</th>
                                    <th>FUEL</th>
                                    <th>QTY</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    USER['QUEUE'].map(({ _id, USERNAME, VEHICLE, FUEL, QTY }) => (
                                        <tr key={_id}>
                                            <td>{USERNAME}</td>
                                            <td>{VEHICLE}</td>
                                            <td>{FUEL}</td>
                                            <td>{QTY}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                    {
                        USER &&
                        <div className="w3-padding">
                            <Link href={`/profile/edit/${AUTH['role']}`} className="w3-button w3-block w3-teal w3-round-large">UPDATE</Link>
                        </div>
                    }
                </div>
            </div>
        </>
    )


}