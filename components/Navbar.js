

export default function Navbar() {

    function openNav() {
        document.getElementById("mySidebar").style.width = "60%";
        document.getElementById("mySidebar").style.display = "block";
    }

    function closeNav() {
        document.getElementById("mySidebar").style.display = "none";
    }

    return (
        <>
            <nav className="w3-sidebar w3-black w3-animate-right w3-xxlarge" style={{ display: 'none', paddingTop: '150px', right: 0, zIndex: 2 }} id="mySidebar">
                <a href="#" onClick={closeNav} className="w3-button w3-black w3-xxxlarge w3-display-topright" style={{ padding: '0 12px' }}>
                    &#x2716;
                </a>
                <div className="w3-bar-block w3-center">
                    <a href="#" className="w3-bar-item w3-button w3-text-grey w3-hover-black" onClick={closeNav} >Home</a>
                    <a href="#portfolio" className="w3-bar-item w3-button w3-text-grey w3-hover-black" onClick={closeNav} >Portfolio</a>
                    <a href="#about" className="w3-bar-item w3-button w3-text-grey w3-hover-black" onClick={closeNav} >About</a>
                    <a href="#contact" className="w3-bar-item w3-button w3-text-grey w3-hover-black" onClick={closeNav} >Contact</a>
                </div>
            </nav>
            <div className="w3-main w3-padding-large" style={{ marginLeft: '40%' }}>
                <span className="w3-button w3-top w3-white w3-xxlarge w3-text-grey w3-hover-text-black" style={{ width: 'auto', right: 0 }} onClick={openNav} >&#9776;</span>
            </div>
        </>
    )

}