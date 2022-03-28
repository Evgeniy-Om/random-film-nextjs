import styles from './Navbar.module.scss'
import React from 'react'
import { Navigation } from '../Navigation/Navigation'
import { Logo } from '../Logo/Logo'

function Navbar() {
    return (
        <header className={styles._}>
            <div className={styles.wrapper}>
                <Logo/>
                <Navigation/>
            </div>
        </header>
    )
}

export default Navbar