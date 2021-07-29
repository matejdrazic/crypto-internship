import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Authorization/Login.js'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { Dashboard } from '@material-ui/icons';
import Cookies from 'js-cookie'
import router from 'next/router';

export default function Home() {

  const [address, setAddress] = useState(false)

  if (address) {
    router.push('/dashboard')
    return null
  } else return <Login setAddress={setAddress} />
}


