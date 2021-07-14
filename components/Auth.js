import Cookies from "js-cookie"
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from './Layout'
import Image from 'next/image'

export default function Auth(Component) {

    return (props) => {

        if (!Cookies.get("address")) {
            return (
                <Layout>
                    <div className="not_found">
                        <Image src="/authority.jpg" alt="cartman" width="430px" height="240px" />
                        <h3>You&apos;re not authenticated to see this page!
                        Please <Link href="/" ><a>log in</a></Link> !</h3>
                    </div>
                </Layout>
            )
        }

        return <Component {...props} />;
    }
}

