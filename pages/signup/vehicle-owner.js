import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import stations from "../../public/stations.json"
import autoComplete from "@tarekraafat/autocomplete.js"
import { useEffect, useState } from "react"
import validator from "validator"
import Link from "next/link"
export default function VehicleOwner() {

    const [PROVINCE,setPROVINCE] = useState('');
    const [DISTRICT,setDISTRICT] = useState('');
    const [LOCATION,setLOCATION] = useState('');
    const [FIRSTNAME,setFIRSTNAME] = useState('');
    const [LASTNAME,setLASTNAME] = useState('');
    const [EMAIL,setEMAIL] = useState('');
    const [CONTACT,setCONTACT] = useState('');
    const [VEHICLE,setVEHICLE] = useState('');
    const [FUEL,setFUEL] = useState('');
    const [PASSWORD,setPASSWORD] = useState('');
    const [ERROR,SETERROR] = useState('');
    useEffect(() => {
        const autoCompleteJS = new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Search for Location...",
            data: {
                src: new Set([...stations.map(({LOCATION})=>LOCATION)]),
                cache: true,
            },
            resultsList: {
                element: (list, data) => {
                    if (!data.results.length) {
                        // Create "No Results" message element
                        const message = document.createElement("div");
                        // Add class to the created element
                        message.setAttribute("class", "no_result");
                        // Add message text content
                        message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
                        // Append message element to the results list
                        list.prepend(message);
                    }
                },
                noResults: true,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        autoCompleteJS.input.value = selection;
                        const {PROVINCE,DISTRICT,LOCATION} = stations.filter(({LOCATION})=>LOCATION === selection)[0]
                        setPROVINCE(PROVINCE)
                        setDISTRICT(DISTRICT)
                        setLOCATION(LOCATION)
                    }
                }
            }
        });

    }, [])

    const REGISTER = async()=>{
        try {
            SETERROR('')
            // VALIDATION START 
            if (FIRSTNAME === '') throw new Error("FIRSTNAME shouldn't empty")
            if (LASTNAME === '') throw new Error("LASTNAME shouldn't empty")
            if (EMAIL === '') throw new Error("EMAIL shouldn't empty")
            if (CONTACT === '') throw new Error("CONTACT shouldn't empty")
            if (VEHICLE === '') throw new Error("VEHICLE shouldn't empty")
            if (FUEL === '') throw new Error("FUEL shouldn't empty")
            if (PASSWORD === '') throw new Error("PASSWORD shouldn't empty")
            if (!validator.isAlpha(FIRSTNAME)) throw new Error("ENTER valid firstname (a-zA-Z)")
            if (!validator.isAlpha(LASTNAME)) throw new Error("ENTER valid lastname (a-zA-Z)")
            if (!validator.isEmail(EMAIL)) throw new Error("ENTER valid email")
            if (!validator.isMobilePhone(CONTACT)) throw new Error("ENTER valid contact")
            if (!validator.isEmail(EMAIL)) throw new Error("ENTER valid email")
            if (!validator.isStrongPassword(PASSWORD)) throw new Error("ENTER strong password. minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1")
            // VALIDATION END 
            const res = await fetch('/api/signup/vehicle-owner',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({PROVINCE,DISTRICT,LOCATION,FIRSTNAME,LASTNAME,EMAIL,CONTACT,VEHICLE,FUEL,PASSWORD})
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data['ERROR'])
            console.log(data);
        } catch (error) {
            SETERROR(error.message)
        }
    }

    return (
        <>
            <Head>
                <title>Signup | VehicleOwner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where={<><Link href="/">home</Link>➤<Link href="/signup">signup</Link>➤<Link href="/signup/vehicle-owner">vehicle-owner</Link></>} />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Take the first step towards maximizing the potential of your station or vehicle by signing up as the owner.
                    </p>
                    {ERROR && <p className="w3-text-red"><b>{ERROR}</b></p>}
                    <div className="w3-padding">
                        <input id="autoComplete" className="w3-input w3-border w3-round-large" type="search" dir="ltr" spellCheck={false} autoCorrect="off" autoComplete="off" autoCapitalize="off" />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your province..." readOnly value={PROVINCE} />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your district..." readOnly value={DISTRICT}/>
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your first name..." value={FIRSTNAME} onInput={e=>setFIRSTNAME(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your last name..." value={LASTNAME} onInput={e=>setLASTNAME (e.target.value)}/>
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email..." value={EMAIL} onInput={e=>setEMAIL(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your contact number..." value={CONTACT} onInput={e=>setCONTACT(e.target.value)}/>
                    </div>
                    
                    <div className="w3-padding">
                        <select className="w3-select" onInput={e=>setVEHICLE(e.target.value)}>
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
                        <select className="w3-select" onInput={e=>setFUEL(e.target.value)}>
                            <option value="">Choose your fuel type</option>
                            <option value="PETROL">PETROL</option>
                            <option value="DIESEL">DIESEL</option>
                        </select>
                    </div>
                    <div className="w3-padding">
                        <input type="password" className="w3-input w3-border w3-round-large" placeholder="Enter your password..." value={PASSWORD} onInput={e=>setPASSWORD(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <button className="w3-button w3-round w3-black" onClick={REGISTER}>REGISTER</button>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )

}