import Layout from '../components/Shared/Layout.js'
import Auth from '../components/Authorization/Auth.js'
import AddressSearch from '../components/Token/AddressSearch.js'

const explore = () => {
    return (
        <Layout>
            <AddressSearch />
        </Layout>
    )
}

export default Auth(explore)