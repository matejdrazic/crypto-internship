import Auth from "./Auth.js"
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

function Dashboard(props) {
        return (
            <h1>Dashboard, hello user {Cookies.get("address")} </h1>
        )

}

export default Dashboard