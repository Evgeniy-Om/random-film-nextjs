import styles from './AddToWhiteListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import useAddFilmToListInStorage from '../../hooks/useAddFilmToListInStorage'

function AddToWhiteListButton() {
    const {addFilmToMyList} = useAddFilmToListInStorage('whitelist')

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

export default AddToWhiteListButton