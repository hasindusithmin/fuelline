import Head from "next/head";
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import Header from "../../components/Header";
import Link from "next/link";
export const getServerSideProps = async ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    if (!token) return { props: { AUTH: false } };
    const DOMAIN = (process.env.ENVIROMENT === 'production') ? 'https://fuelline.vercel.app':'http://127.0.0.1:3000'
    const RES = await fetch(`${DOMAIN}/api/verify`, {
        headers: {
            'Content-Type': 'application/json',
            'token': token
        }
    })
    const data = await RES.json()
    return { props: { AUTH: data } };
};

export default function Profile({ AUTH }) {

    const ROUTER = useRouter()

    if (!AUTH) {
        ROUTER.replace('/')
    }

    const forbidden = ['_id', 'PASSWORD', '__v', 'QUEUE']

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
                    <table className="w3-table-all">
                        <tbody>
                            {

                                Object.entries(AUTH['user']).map(([key, value]) => {
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
                    {
                        AUTH['user']['QUEUE'].length > 0 &&
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
                                    AUTH['user']['QUEUE'].map(({ _id, USERNAME, VEHICLE, FUEL, QTY }) => (
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
                    <div className="w3-padding">
                        <Link href={`/profile/edit/${AUTH['role']}`} className="w3-button w3-block w3-teal">UPDATE</Link>
                    </div>
                </div>
            </div>
        </>
    )


}