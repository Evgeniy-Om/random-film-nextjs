import styles from './DeleteFromListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import useMoveFromFavoritesToBlackList from '../../hooks/useMoveFromFavoritesToBlackList'

function DeleteFromListButton() {
    const {moveFromFavoritesToBlackList} = useMoveFromFavoritesToBlackList()
    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<PlaylistRemoveIcon/>}
                onClick={moveFromFavoritesToBlackList}
                variant="contained"
                color="error"
            >
                Переместить в блэк-лист
            </Button>
        </div>
    )
}

export default DeleteFromListButton