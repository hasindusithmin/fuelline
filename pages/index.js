import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

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

      <div className="w3-main w3-padding-large" style={{marginLeft:'40%'}}>
          <Header />
      </div>

      
    </>
  )
}
