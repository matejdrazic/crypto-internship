import Cookies from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Auth.js'
import Dashboard from '../components/Dashboard.js'
import styles from '../styles/Home.module.css'

const dashboard = () => {
  return(
    <Dashboard address={false} />
  )
}

export default Auth(dashboard)
