import Layout from '../components/Shared/Layout.js'
import Auth from '../components/Authorization/Auth.js'
import CreateToken from '../components/Token/CreateToken.js'
import { useEffect, useState } from 'react'

const createatoken = () => {

    const [object, setObject] = useState(null)

    useEffect(() => {
        setObject(window.ethereum)
    })

    if (object) {
        return (
            <Layout>
                <CreateToken />
            </Layout>
        )
    } else {
        return <Auth />
    }
}

export default createatoken