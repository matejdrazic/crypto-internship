import Link from 'next/link'
import Image from 'next/image'

const FourOFour = () => {
    return (
            <div className="not_found">
                <Image src="/four.gif" alt="cartman" width="262px" height="200px" />
                <h3>Go back to the <Link href="/"><a>login page.</a></Link></h3>
            </div>
    )
}

export default FourOFour