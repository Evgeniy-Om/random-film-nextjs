import styles from './AddToBlackListButton.module.scss'
import { Button } from '@mui/material'
import useAddFilmToListInStorage from '../../hooks/useAddFilmToListInStorage'
import { BLACK_LIST } from '../../constants'
import DeleteIcon from '@mui/icons-material/Delete'

function AddToBlackListButton() {
    const {addFilmToMyList} = useAddFilmToListInStorage(BLACK_LIST)

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<DeleteIcon/>}
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