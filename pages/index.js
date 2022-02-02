import Login from '../components/Authorization/Login.js'
import React, { useState } from 'react';
import router from 'next/router';

export default function Home() {

  const [address, setAddress] = useState(false)

  if (address) {
    router.push('/dashboard')
    return null
  } else return <Login setAddress={setAddress} />
}


