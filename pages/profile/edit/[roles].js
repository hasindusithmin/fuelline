import Head from "next/head";
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import Header from "../../../components/Header";
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
    const data = await RES.json()
    return { props: { AUTH: data } };
};

export default function EditProfile({ AUTH }) {

    const ROUTER = useRouter()

    if (!AUTH) {
        ROUTER.replace('/')
    }

    const [ISSTATION, setISSTATION] = useState(false);
    const [ISVEHICLE, setISVEHICLE] = useState(false);
    const [ERROR, setERROR] = useState('')

    // COMMONS 
    const [ID, setID] = useState('')
    const [PROVINCE, setPROVINCE] = useState('');
    const [DISTRICT, setDISTRICT] = useState('');
    const [LOCATION, setLOCATION] = useState('');
    const [EMAIL, setEMAIL] = useState('');
    const [CONTACT, setCONTACT] = useState('');
    const [PASSWORD, setPASSWORD] = useState('');


    //VEHICLE
    const [FIRSTNAME, setFIRSTNAME] = useState('');
    const [LASTNAME, setLASTNAME] = useState('');
    const [VEHICLE, setVEHICLE] = useState('');
    const [FUEL, setFUEL] = useState('');

    // STATION 
    const [DEALER, setDEALER] = useState('');
    const [ARRIVALTIME, setARRIVALTIME] = useState('');
    const [FINISHTIME, setFINISHTIME] = useState('');
    const [DIESEL, setDIESEL] = useState('');
    const [PETROL, setPETROL] = useState('');


    // useEffect(() => {
    //     const { _id, PROVINCE, DISTRICT, LOCATION, EMAIL, CONTACT } = AUTH['user']
    //     setID(_id)
    //     setPROVINCE(PROVINCE)
    //     setDISTRICT(DISTRICT)
    //     setLOCATION(LOCATION)
    //     setEMAIL(EMAIL)
    //     setCONTACT(CONTACT)

    //     if (AUTH['role'] === 'vehicle') {
    //         const { FIRSTNAME, LASTNAME, VEHICLE, FUEL } = AUTH['user']
    //         setFIRSTNAME(FIRSTNAME)
    //         setLASTNAME(LASTNAME)
    //         setVEHICLE(VEHICLE)
    //         setFUEL(FUEL)
    //         setISVEHICLE(true)
    //     }
    //     if (AUTH['role'] === 'station') {
    //         const { DEALER, ARRIVALTIME, FINISHTIME, DIESEL, PETROL } = AUTH['user']
    //         setDEALER(DEALER)
    //         setARRIVALTIME(ARRIVALTIME)
    //         setFINISHTIME(FINISHTIME)
    //         setDIESEL(DIESEL)
    //         setPETROL(PETROL)
    //         setISSTATION(true)
    //     }
    // }, [])

    useEffect(() => {
        const { _id } = AUTH['user']
        const Role = AUTH['role']

        if (Role === 'vehicle') {
            fetch(`/api/one/vehicle-owner?id=${_id}`)
                .then(res => res.json())
                .then(data => {
                    const { _id, PROVINCE, DISTRICT, LOCATION, EMAIL, CONTACT } = data;
                    // COMMONS
                    setID(_id)
                    setPROVINCE(PROVINCE)
                    setDISTRICT(DISTRICT)
                    setLOCATION(LOCATION)
                    setEMAIL(EMAIL)
                    setCONTACT(CONTACT)
                    // UNIQUES 
                    const { FIRSTNAME, LASTNAME, VEHICLE, FUEL } = data
                    setFIRSTNAME(FIRSTNAME)
                    setLASTNAME(LASTNAME)
                    setVEHICLE(VEHICLE)
                    setFUEL(FUEL)
                    setISVEHICLE(true)
                })
                .catch(error => {
                    console.error(error.message);
                })
        }
        if (Role === 'station') {
            fetch(`/api/one/station-owner?id=${_id}`)
                .then(res => res.json())
                .then(data => {
                    const { _id, PROVINCE, DISTRICT, LOCATION, EMAIL, CONTACT } = data;
                    // COMMONS
                    setID(_id)
                    setPROVINCE(PROVINCE)
                    setDISTRICT(DISTRICT)
                    setLOCATION(LOCATION)
                    setEMAIL(EMAIL)
                    setCONTACT(CONTACT)
                    // UNIQUES
                    const { DEALER, ARRIVALTIME, FINISHTIME, DIESEL, PETROL } = data
                    setDEALER(DEALER)
                    setARRIVALTIME(ARRIVALTIME)
                    setFINISHTIME(FINISHTIME)
                    setDIESEL(DIESEL)
                    setPETROL(PETROL)
                    setISSTATION(true)
                })
                .catch(error=>{
                    console.error(error.message);
                })
        }

    }, [])

    const Edit_Vehicle = async () => {

        try {
            setERROR('')
            const res = await fetch('/api/update/vehicle-owner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ID, EMAIL, CONTACT, FIRSTNAME, LASTNAME, VEHICLE, FUEL })
            })
            const data = await res.json('')
            if (!res.ok) throw Error(data['ERROR'])
            ROUTER.replace(`/profile/${AUTH['role']}`)
        } catch (error) {
            setERROR(error.message)
        }

    }

    const Edit_Station = async () => {
        try {
            setERROR('')
            const res = await fetch('/api/update/station-owner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ID, EMAIL, CONTACT, ARRIVALTIME, FINISHTIME, DIESEL, PETROL })
            })
            const data = await res.json('')
            if (!res.ok) throw Error(data['ERROR'])
            ROUTER.replace(`/profile/${AUTH['role']}`)
        } catch (error) {
            setERROR(error.message)
        }
    }

    return (
        <>
            <Head>
                <title>FuelLine | Edit</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header where={<><Link href="/">home</Link>➤<Link href="/profile">profile</Link>➤<Link href="/profile/edit">edit</Link>➤<Link href={`/profile/edit/${AUTH['role']}`}>{AUTH['role']}</Link></>} />

            {
                ISSTATION &&
                <div className="w3-content w3-padding">
                    <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                        {
                            ERROR && <p className="w3-text-red"><b>{ERROR}</b></p>
                        }
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your province..." readOnly value={DEALER} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your province..." readOnly value={PROVINCE} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your district..." readOnly value={DISTRICT} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your location..." readOnly value={LOCATION} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email..." value={EMAIL} onInput={e => setEMAIL(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your contact number..." value={CONTACT} onInput={e => setCONTACT(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <div>Fuel arrival time</div>
                            <input type="datetime-local" className="w3-input w3-border w3-round-large" value={ARRIVALTIME} onInput={e => setARRIVALTIME(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <div>Fuel finish time</div>
                            <input type="datetime-local" className="w3-input w3-border w3-round-large" value={FINISHTIME} onInput={e => setFINISHTIME(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <input type="number" className="w3-input w3-border w3-round-large" placeholder="Enter diesel capacity (liters)..." min={0} value={DIESEL} onInput={e => setDIESEL(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <input type="number" className="w3-input w3-border w3-round-large" placeholder="Enter petrol capacity (liters)..." min={0} value={PETROL} onInput={e => setPETROL(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <button className="w3-button w3-round w3-black" onClick={Edit_Station}>UPDATE</button>
                        </div>
                    </div>
                </div>
            }

            {
                ISVEHICLE &&
                <div className="w3-content w3-padding">
                    <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                        {
                            ERROR && <p className="w3-text-red"><b>{ERROR}</b></p>
                        }
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your province..." readOnly value={LOCATION} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your province..." readOnly value={PROVINCE} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your district..." readOnly value={DISTRICT} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your first name..." value={FIRSTNAME} onInput={e => setFIRSTNAME(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your last name..." value={LASTNAME} onInput={e => setLASTNAME(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email..." value={EMAIL} onInput={e => setEMAIL(e.target.value)} />
                        </div>
                        <div className="w3-padding">
                            <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your contact number..." value={CONTACT} onInput={e => setCONTACT(e.target.value)} />
                        </div>

                        <div className="w3-padding">
                            <select className="w3-select" onInput={e => setVEHICLE(e.target.value)}>
                                <option value="">Choose your vehicle type</option>
                                <option value="BIKE">BIKE</option>
                                <option value="3WHEEL">3WHEEL</option>
                                <option value="CAR">CAR</option>
                                <option value="VAN">VAN</option>
                                <option value="LORRY">LORRY</option>
                                <option value="LAND VEHICLE">LAND VEHICLE</option>
                            </select>
                        </div>
                        <div className="w3-padding">
                            <select className="w3-select" onInput={e => setFUEL(e.target.value)}>
                                <option value="">Choose your fuel type</option>
                                <option value="PETROL">PETROL</option>
                                <option value="DIESEL">DIESEL</option>
                            </select>
                        </div>
                        <div className="w3-padding">
                            <button className="w3-button w3-round w3-black" onClick={Edit_Vehicle}>UPDATE</button>
                        </div>
                    </div>
                </div>
            }






        </>
    )

}