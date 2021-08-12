import Cookies from "js-cookie"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../Shared/Layout'
import Image from 'next/image'

export default function Auth() {

    return (
        <div className="not_found center">
            <Image src="/authority.jpg" alt="cartman" width="430px" height="240px" />
            <h3>You do not have access to this page, please install MetaMask!
                <br />
                <Link href="/" ><a>Login page</a></Link> !</h3>
        </div>
    )

}

