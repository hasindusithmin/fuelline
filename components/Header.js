
import { Inter } from '@next/font/google'


const inter = Inter({ subsets: ['vietnamese'] })


export default function Header() {

    return (
        <div className={inter.className}>
            <header className="w3-container w3-center" style={{ padding: '64px 16px' }}>
                <h1 className="w3-xxxlarge"><b>FUEL <span className='w3-tag'>LINE</span> </b></h1>
                <p>Petrol Queue Management System</p>
            </header>
        </div>
    )
}