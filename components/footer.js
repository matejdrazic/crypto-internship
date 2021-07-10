import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
                href="https://blankhq.co"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span className={styles.logo}>
                    <Image src="/blank.png" alt="Vercel Logo" width={40} height={40} />
                </span>
            </a>
        </footer>
    )
}

export default Footer;