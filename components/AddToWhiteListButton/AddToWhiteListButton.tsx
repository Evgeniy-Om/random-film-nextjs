import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import styles from './AddToWhiteListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

function AddToWhiteListButton() {
    const {disableButton} = kinopoiskSlice.actions
    const {currentFilmNumber} = useAppSelector(state => state.kinopoisk)
    const {changeCurrentFilmNumber} = kinopoiskSlice.actions
    const dispatch = useDispatch()

    const handleClick = () => {
        console.log(currentFilmNumber)
        dispatch(changeCurrentFilmNumber(currentFilmNumber - 1))
        dispatch(disableButton(false))
    }

    return (<div className={styles._}>
        <Button
            className={styles.button}
            startIcon={<PlaylistAddCheckIcon/>}
            onClick={handleClick}
            variant="contained"
            color="success"
        >
            В избранное
        </Button>
    </div>)
}

export default AddToWhiteListButton