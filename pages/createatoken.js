import Layout from '../components/Layout.js'
import Auth from '../components/Auth.js'
import CreateToken from '../components/CreateToken.js'

const createatoken = () => {
    return (
        <Layout>
            <CreateToken />
        </Layout>
    )
}

export default Auth(createatoken)