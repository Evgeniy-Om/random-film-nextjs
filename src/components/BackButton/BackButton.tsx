import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import styles from './BackButton.module.scss'
import { Button } from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply'

function BackButton() {
    const {disableButton} = kinopoiskSlice.actions
    const {currentFilmNumber, counter} = useAppSelector(state => state.kinopoisk)
    const {changeCurrentFilmNumber, changeCounter} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    const handleClick = () => {
        console.log(currentFilmNumber)
        dispatch(changeCurrentFilmNumber(currentFilmNumber - 1))
        dispatch(disableButton(false))
        dispatch(changeCounter(counter+1))
    }

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<ReplyIcon/>}
                onClick={handleClick}
                variant="contained"
                disabled={!currentFilmNumber}
            >
            </Button>
        </div>
    )
}

export default BackButton