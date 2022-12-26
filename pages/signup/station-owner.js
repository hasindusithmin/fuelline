
import Head from "next/head"
import Navbar from "../../components/Navbar"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import stations from "../../public/stations.json"
import autoComplete from "@tarekraafat/autocomplete.js"
import { useEffect, useState } from "react"

export default function StationOwner() {

    const [DEALER,setDEALER] = useState('');
    const [EMAIL,setEMAIL] = useState('');
    const [CONTACT,setCONTACT] = useState('');
    const [PROVINCE,setPROVINCE] = useState('');
    const [DISTRICT,setDISTRICT] = useState('');
    const [LOCATION,setLOCATION] = useState('');
    const [ARRIVALTIME,setARRIVALTIME] = useState('');
    const [FINISHTIME,setFINISHTIME] = useState('');
    const [DIESEL,setDIESEL] = useState('');
    const [PETROL,setPETROL] = useState('');
    const [PASSWORD,setPASSWORD] = useState('');
    const [QUEUE,setQUEUE] = useState([]);

    useEffect(() => {
        const autoCompleteJS = new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Search for Dealers...",
            data: {
                src: stations.map(({DEALER})=>DEALER),
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
                        const {DEALER,PROVINCE,DISTRICT,LOCATION} = stations.filter(({DEALER})=>DEALER === selection)[0]
                        setDEALER(DEALER)
                        setPROVINCE(PROVINCE)
                        setDISTRICT(DISTRICT)
                        setLOCATION(LOCATION)
                    }
                }
            }
        });

    }, [])

    // ++++++++++++++ REGISTER Function +++++++++++++++

    const REGISTER = ()=>{
        const data = {DEALER,PROVINCE,DISTRICT,LOCATION,EMAIL,CONTACT,ARRIVALTIME,FINISHTIME,DIESEL,PETROL,PASSWORD,QUEUE}
        console.log(data);
    }

    return (
        <>
            <Head>
                <title>Signup | StationOwner</title>
                <meta name="description" content="managing petrol queues at fuel sheds" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />

            <Header where="Signup>StationOwner" />

            <div className="w3-content w3-padding">
                <div className="w3-center w3-padding-large w3-margin-bottom w3-card-4 w3-round-xlarge">
                    <p>
                        Take the first step towards maximizing the potential of your station or vehicle by signing up as the owner.
                    </p>
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
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your location..." readOnly value={LOCATION} />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your email..." value={EMAIL} onInput={e=>setEMAIL(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <input type="text" className="w3-input w3-border w3-round-large" placeholder="Enter your contact number..." value={CONTACT} onInput={e=>setCONTACT(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <div>Fuel arrival time</div>
                        <input type="datetime-local" className="w3-input w3-border w3-round-large" value={ARRIVALTIME} onInput={e=>setARRIVALTIME(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <div>Fuel finish time</div>
                        <input type="datetime-local" className="w3-input w3-border w3-round-large" value={FINISHTIME} onInput={e=>setFINISHTIME(e.target.value)}/>
                    </div>
                    <div className="w3-padding">
                        <input type="number" className="w3-input w3-border w3-round-large" placeholder="Enter diesel capacity (liters)..." min={0}  value={DIESEL} onInput={e=>setDIESEL(e.target.value)}/>
                    </div>
                    <div className="w3-padding">
                        <input type="number" className="w3-input w3-border w3-round-large" placeholder="Enter petrol capacity (liters)..." min={0} value={PETROL} onInput={e=>setPETROL(e.target.value)} />
                    </div>
                    <div className="w3-padding">
                        <input type="password" className="w3-input w3-border w3-round-large" placeholder="Enter your password..." value={PASSWORD} onInput={e=>setPASSWORD(e.target.value)}/>
                    </div>
                    <div className="w3-padding" onClick={REGISTER}>
                        <button className="w3-button w3-round w3-black">REGISTER</button>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )

}