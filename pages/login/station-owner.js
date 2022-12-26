
import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
export default function StationOwner() {

    return (
        <>
            <Head>
                <title>Login | Station Owner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where="Login>StationOwner" />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Experience the convenience of managing your station as the owner!
                    </p>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email address..." />
                    </div>
                    <div className="w3-padding">
                        <input type="password" className="w3-input w3-border w3-round-large" placeholder="Enter your password..." />
                    </div>
                    <div className="w3-padding">
                        <button className="w3-button w3-round w3-black">Login</button>
                    </div>
                </div>
            </div>

            <Footer fixed={true}/>
        </>
    )

}