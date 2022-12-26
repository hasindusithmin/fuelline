import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function VehicleOwner() {

    return (
        <>
            <Head>
                <title>Signup | VehicleOwner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where="Signup>VehicleOwner" />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Take the first step towards maximizing the potential of your station or vehicle by signing up as the owner.
                    </p>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your first name..." />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your last name..." />
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
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your district..." />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your location..." />
                    </div>
                    
                    <div className="w3-padding">
                        <select className="w3-select">
                            <option value="" disabled selected>Choose your vehicle type</option>
                            <option value="BIKE">BIKE</option>
                            <option value="3WHEEL">3WHEEL</option>
                            <option value="CAR">CAR</option>
                            <option value="VAN">VAN</option>
                            <option value="LORRY">LORRY</option>
                            <option value="QUADRICYCLE">QUADRICYCLE</option>
                            <option value="LAND VEHICLE">LAND VEHICLE</option>
                        </select>
                    </div>
                    <div className="w3-padding">
                        <select className="w3-select">
                            <option value="" disabled selected>Choose your fuel type</option>
                            <option value="PETROL">PETROL</option>
                            <option value="DIESEL">DIESEL</option>
                        </select>
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

            <Footer />

        </>
    )

}