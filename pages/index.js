import Login from '../components/Authorization/Login.js'
import React, { useState } from 'react';
import router from 'next/router';
import { useWeb3Context } from 'web3-react';

export default function Home() {

  const context = useWeb3Context()

  if (context.account) {
    router.push('/dashboard')
    return null
  } else return <Login/>
}


