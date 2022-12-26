import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Inter } from '@next/font/google'
import Link from 'next/link'
import Footer from '../components/Footer'
import {FaRegistered} from "react-icons/fa"
import {RiLoginBoxFill} from "react-icons/ri"
import {HiSearchCircle} from "react-icons/hi"
const inter = Inter({ subsets: ['latin'] })
export default function Home() {

  return (
    <>
      <Head>
        <title>FuelLine | Home</title>
        <meta name="description" content="managing petrol queues at fuel sheds" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w3-sidebar w3-hide-medium w3-hide-small" style={{ width: '40%' }}>
        <div className={styles.bgimg}></div>
      </div>

      <Navbar />

      <div className="w3-main w3-padding-large" style={{ marginLeft: '40%' }}>
        <Header />

        <div className='w3-row w3-padding w3-margin-bottom w3-card-4 w3-round-xlarge w3-justify'>
          <p className={inter.className}>
            Welcome to our innovative web application, designed to make the process of waiting in petrol queues a breeze! As a vehicle owner, you can easily find the nearest petrol shed and join the queue using our simple and user-friendly interface. No more waiting around aimlessly - with our app, you can see exactly how many vehicles are ahead of you in the queue, grouped by vehicle type.
          </p>
        </div>

        <div className='w3-row w3-center w3-padding w3-margin-bottom w3-card-4 w3-round-xlarge'>
          <p className={inter.className}>
            <b className='w3-opacity'>Find the nearest petrol queue and login or sign up with just a few clicks.</b>
          </p>
          <div className='w3-third w3-center w3-padding'>
            <Link href="#" className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left'> <HiSearchCircle/> <span className='w3-tag  w3-small'> <b>NEARME</b> </span></Link>
          </div>
          <div className='w3-third w3-center w3-padding'>
            <Link href="/signup" className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left'> <FaRegistered/> <span className='w3-tag w3-small'><b>SIGNUP</b></span> </Link>
          </div>
          <div className='w3-third w3-center w3-padding'>
            <Link href="/login" className='w3-button w3-block w3-light-grey w3-round-large w3-xlarge w3-margin-left'><RiLoginBoxFill /> <span className='w3-tag w3-small'><b>LOGIN</b></span></Link>
          </div>
          <div className='w3-padding w3-text-white'>...</div>
        </div>

        <div className='w3-row w3-padding w3-margin-bottom w3-card-4 w3-round-xlarge w3-justify'>
          <p className={inter.className}>
            Our mission is to provide a convenient and efficient way for vehicle owners to find and join the nearest petrol queue, and for shed owners to update fuel availability for all users.
          </p>
        </div>

        <Footer/>

      </div>


    </>
  )
}
