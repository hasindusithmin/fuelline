import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"

export default function VehicleOwner() {

    return (
        <>
            <Head>
                <title>Login | Vehicle Owner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where="Login/VehicleOwner" />
        </>
    )

}