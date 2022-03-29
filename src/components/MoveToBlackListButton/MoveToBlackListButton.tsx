import styles from './MoveToBlackListButton.module.scss'
import { Button } from '@mui/material'
import useMoveFromFavoritesToBlackList from '../../hooks/useMoveFromFavoritesToBlackList'
import DeleteIcon from '@mui/icons-material/Delete'

function MoveToBlackListButton() {
    const {moveFromFavoritesToBlackList} = useMoveFromFavoritesToBlackList()
    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<DeleteIcon/>}
                onClick={moveFromFavoritesToBlackList}
                variant="contained"
                color="error"
            >
                Переместить в блэк-лист
            </Button>
        </div>
    )
}

export default MoveToBlackListButton