import Link from 'next/link'
import styles from './Navigation.module.scss'
import { useRouter } from 'next/router'

export function Navigation() {
    const route = useRouter().route
    const menuItems = [
        {link: '/', text: 'Главная'},
        {link: '/favorites', text: 'Избранное'},
        {link: '/blacklist', text: 'Блэк-лист'},
        {link: '/settings', text: 'Настройки'},
    ]
    return (
        <ul className={styles.list}>
            {menuItems.map((i, index) => {
                if (route === '/' && index === 0) return <></>

                let classes = `${styles.link} `
                if (route === i.link) classes += 'active-link'
                return (
                    <li>
                        <Link href={i.link}>
                            <a className={classes}>{i.text}</a>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}