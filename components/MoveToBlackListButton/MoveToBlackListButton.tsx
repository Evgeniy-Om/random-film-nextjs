import styles from './MoveToBlackListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import useAddToMyList from '../../hooks/useAddToMyList'

function MoveToBlackListButton() {
    const {addToList} = useAddToMyList('blacklist')

    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistRemoveIcon/>}
                onClick={addToList}
                variant="contained"
                color="error"
            >
                Переместить в блек-лист
            </Button>
        </div>
    )
}

export default MoveToBlackListButton