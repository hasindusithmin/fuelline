import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['vietnamese'] })

export default function Footer() {

    return (
        <div className={inter.className}>
            <footer className="w3-container w3-center" style={{ padding: '32px 16px' }}>
                <h3 className="w3-large w3-animate-fading"><b>FUEL <span className='w3-tag'>LINE</span> </b></h3>
                <p>Copyright 2023. All Rights Reserved.</p>
            </footer>
        </div>
    )

}