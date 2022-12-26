
import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function StationOwner() {

    return (
        <>
            <Head>
                <title>Signup | StationOwner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar/>

            <Header where="Signup>StationOwner" />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Take the first step towards maximizing the potential of your station or vehicle by signing up as the owner.
                    </p>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your station name..." />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email..." />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your contact number..." />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your province..." />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your district..." min={0}/>
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your location..." min={0} />
                    </div>
                    <div className="w3-padding">
                        <div>Fuel arrival time</div>
                        <input type="datetime-local" className="w3-input w3-border w3-round-large" />
                    </div>
                    <div className="w3-padding">
                        <div>Fuel finish time</div>
                        <input type="datetime-local" className="w3-input w3-border w3-round-large" />
                    </div>
                    <div className="w3-padding">
                        <input type="number" className="w3-input w3-border w3-round-large" placeholder="Enter diesel capacity (liters)..." />
                    </div>
                    <div className="w3-padding">
                        <input type="number" className="w3-input w3-border w3-round-large" placeholder="Enter petrol capacity (liters)..." />
                    </div>
                    <div className="w3-padding">
                        <input type="password" className="w3-input w3-border w3-round-large" placeholder="Enter your password..." />
                    </div>
                    <div className="w3-padding">
                        <input type="password" className="w3-input w3-border w3-round-large" placeholder="confirm password..." />
                    </div>
                    <div className="w3-padding">
                        <button className="w3-button w3-round w3-black">Register</button>
                    </div>
                </div>
            </div>
        </>
    )

}