import Layout from '../components/Shared/Layout.js'
import Auth from '../components/Authorization/Auth.js'
import CreateToken from '../components/Token/CreateToken.js'
import { useEffect, useState } from 'react'

const createatoken = () => {

    return (
        <Layout>
            <CreateToken />
        </Layout>
    )

}

export default createatoken