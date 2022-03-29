import styles from './AddToFavoritesListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import useAddFilmToListInStorage from '../../hooks/useAddFilmToListInStorage'
import { FAVORITES_LIST } from '../../constants'

function AddToFavoritesListButton() {
    const {addFilmToMyList} = useAddFilmToListInStorage(FAVORITES_LIST)

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistAddCheckIcon/>}
                onClick={addFilmToMyList}
                variant="contained"
                color="success"
            >
                В избранное
            </Button>
        </div>
    )
}

export default AddToFavoritesListButton