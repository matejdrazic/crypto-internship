import Layout from '../components/Layout.js'
import Auth from '../components/Auth.js'
import AddressSearch from '../components/AddressSearch.js'

const explore = () => {
    return (
        <Layout>
            <AddressSearch />
        </Layout>
    )
}

export default Auth(explore)