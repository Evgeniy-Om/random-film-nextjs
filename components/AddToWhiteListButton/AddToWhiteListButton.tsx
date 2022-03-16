import styles from './AddToWhiteListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import useAddToMyList from '../../hooks/useAddToMyList'

function AddToWhiteListButton() {
    const {addToList} = useAddToMyList('whitelist')

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistAddCheckIcon/>}
                onClick={addToList}
                variant="contained"
                color="success"
            >
                В избранное
            </Button>
        </div>
    )
}

export default AddToWhiteListButton