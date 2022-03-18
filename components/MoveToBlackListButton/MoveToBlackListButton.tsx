import styles from './MoveToBlackListButton.module.scss'
import { Button } from '@mui/material'
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove'
import useMoveFromFavoritesToBlackList from '../../hooks/useMoveFromFavoritesToBlackList'

function MoveToBlackListButton() {
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
                Переместить в блек-лист
            </Button>
        </div>
    )
}

export default MoveToBlackListButton