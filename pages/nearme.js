import Head from "next/head"
import Navbar from "../components/Navbar"
import Header from "../components/Header"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"

export const getServerSideProps = ({ req, res }) => {
    const token = getCookie('JWT', { req, res });
    if (!token) return { props: { AUTH:true } };
    return { props: { AUTH:false} };
};

export default function NearMe({ AUTH }) {

    const ROUTER = useRouter()

    if (!AUTH) {
        ROUTER.replace('/')
    }


    return (
        <>
            <Head>
                <title>FuelLine | Login</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/nearme">nearme</Link></>} />

        </>
    )

}