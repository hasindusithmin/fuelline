import Head from "next/head";
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import Header from "../../components/Header";
import Link from "next/link";
export const getServerSideProps = async ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    if (!token) return { props: { AUTH: false } };
    const RES = await fetch('http://127.0.0.1:3000/api/verify', {
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

    const forbidden = ['_id', 'PASSWORD', '__v']

    return (
        <>
            <Head>
                <title>FuelLine | Profile</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header where={<><Link href="/">home</Link>➤<Link href="/profile">profile</Link>➤<Link href={`/${AUTH['role']}`}>{AUTH['role']}</Link></>} />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <table className="w3-table-all">
                        <tbody>
                            {

                                Object.entries(AUTH['user']).map(([key, value]) => {
                                    if (!forbidden.includes(key)) {
                                        return (
                                            <tr key={key}>
                                                <td>{key}</td>
                                                <td>{value}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )


}