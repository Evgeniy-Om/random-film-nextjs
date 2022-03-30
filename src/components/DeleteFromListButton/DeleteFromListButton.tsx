import styles from './DeleteFromListButton.module.scss'
import { Button } from '@mui/material'
import useDeleteFromList from '../../hooks/useDeleteFromList'
import { TypeListTypes } from '../../types'
import CachedIcon from '@mui/icons-material/Cached'

type PropsTypes = {
    typeList: TypeListTypes
}
function DeleteFromListButton({typeList}: PropsTypes) {
    const {deleteFromList} = useDeleteFromList(typeList)
    return (
        <div className={styles._}>
            <Button
                className={styles.button}
                startIcon={<CachedIcon/>}
                onClick={deleteFromList}
                variant="contained"
            >
                Восстановить показы в поиске
            </Button>
        </div>
    )
}

export default DeleteFromListButton