import styles from './Logo.module.scss'
import Link from 'next/link'
import ImageNJS from 'next/image'
import React from 'react'

export function Logo() {
    return (
        <Link href="/">
            <a className={styles.link}>
                <ImageNJS
                    src="/logo.png"
                    width={30}
                    height={30}
                    className={styles.image}
                    priority
                />
                <p className={styles.text}>Random Film</p>
            </a>
        </Link>
    )
}