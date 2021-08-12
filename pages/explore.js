import Layout from '../components/Shared/Layout.js'
import Auth from '../components/Authorization/Auth.js'
import AddressSearch from '../components/Token/AddressSearch.js'
import { useEffect, useState } from 'react'

const explore = () => {

    const [object, setObject] = useState(null)

    useEffect(() => {
        setObject(window.ethereum)
    })

    if (object) {
        return (
            <Layout>
                <AddressSearch />
            </Layout>
        )
    } else {
        return <Auth />
    }
}

export default explore