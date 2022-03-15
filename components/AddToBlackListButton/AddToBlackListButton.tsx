import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../hooks/redux'
import { kinopoiskSlice } from '../../store/kinopoiskSlice'
import styles from './AddToBlackListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

function AddToBlackListButton() {
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
            startIcon={<PlaylistRemoveIcon/>}
            onClick={handleClick}
            variant="contained"
            color="error"
        >
            В блек-лист
        </Button>
    </div>)
}

export default AddToBlackListButton