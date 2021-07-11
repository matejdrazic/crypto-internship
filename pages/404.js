import Link from 'next/link'
import Layout from '../components/Layout'

const FourOFour = () => {
    return (
        <Layout>
            <div className="not_found">
                <img src="../four.gif" width="262px" height="200px" />
                <h3>Go back to the <Link href="/"><a>login page.</a></Link></h3>
            </div>
        </Layout>
    )
}

export default FourOFour