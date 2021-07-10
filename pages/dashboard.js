import Cookies from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Auth.js'
import Dashboard from '../components/Dashboard.js'
import Layout from '../components/Layout.js'
import styles from '../styles/Home.module.css'

const dashboard = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default Auth(dashboard)
