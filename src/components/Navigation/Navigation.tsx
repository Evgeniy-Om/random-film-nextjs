import Link from 'next/link'
import styles from './Navigation.module.scss'

export function Navigation() {
    return (
        <ul className={styles.list}>
            <li>
                <Link href="/favorites">
                    <a className={styles.link}>Избранное</a>
                </Link>
            </li>
            <li>
                <Link href="/blacklist">
                    <a className={styles.link}>Блек&#8209;лист</a>
                </Link>
            </li>
        </ul>
    )
}