import styles from './AddToBlackListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import useAddFilmToListInStorage from '../../hooks/useAddFilmToListInStorage'
import { BLACK_LIST } from '../../constants'

function AddToBlackListButton() {
    const {addFilmToMyList} = useAddFilmToListInStorage(BLACK_LIST)

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistRemoveIcon/>}
                onClick={addFilmToMyList}
                variant="contained"
                color="error"
            >
                В блэк-лист
            </Button>
        </div>
    )
}

export default AddToBlackListButton