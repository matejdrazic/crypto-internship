import Head from 'next/head'
import Auth from '../components/Authorization/Auth.js'
import Layout from '../components/Shared/Layout.js'

const About = () => {
    return (
        <Layout>
            <div>
                <p>This is the about page in my crypto-internship project.</p>
            </div>
        </Layout>
    )
}

export default Auth(About)