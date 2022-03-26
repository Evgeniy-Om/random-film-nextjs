import styles from './Counter.module.scss'
import { useAppSelector } from '../../hooks/redux'
import cn from 'classnames'

function Counter() {
    const {counter} = useAppSelector(state => state.kinopoisk)

    if (counter >= 100) {
        return <div className={cn(styles._, styles.more100)}>99+</div>
    } else if (counter <= 0) {
        return <div className={styles._}>0</div>
    } else {
        return <div className={styles._}>{counter}</div>
    }
}

export default Counter