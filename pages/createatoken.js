import Layout from '../components/Layout.js'
import Auth from '../components/Auth.js'

const createatoken = () => {
    return (
        <Layout>
            <h1>Create a Token</h1>
        </Layout>
    )
}

export default Auth(createatoken)