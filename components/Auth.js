import Cookies from "js-cookie"
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Auth(Component) {

    return (props) => {

        if (!Cookies.get("address")) {
            return (
                <div>
                    You're not authenticated to see this page!
                    Please <Link href="/" ><a>log in</a></Link> !
                </div>
            )
        }

        return <Component {...props} />;
    }
};
