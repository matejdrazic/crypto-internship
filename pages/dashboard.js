import Cookies from 'js-cookie'
import Head from 'next/head'
import Image from 'next/image'
import Auth from '../components/Authorization/Auth.js'
import Dash from '../components/Token/Dash.js'
import Layout from '../components/Shared/Layout.js'
import Login from '../components/Authorization/Login.js'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const dashboard = () => {

  return (
    <Layout>
      <Dash />
    </Layout>
  )
}

export default dashboard
