import styles from './AddToBlackListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import useAddFilmToListInStorage from '../../hooks/useAddFilmToListInStorage'

function AddToBlackListButton() {
    const {addFilmToMyList} = useAddFilmToListInStorage('blacklist')

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistRemoveIcon/>}
                onClick={addFilmToMyList}
                variant="contained"
                color="error"
            >
                В блек-лист
            </Button>
        </div>
    )
}

export default AddToBlackListButton