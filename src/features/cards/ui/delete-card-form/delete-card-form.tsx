import {Button, Card, Typography} from '@/components'
import {useDeleteCardMutation} from "@/features/cards/model";
import s from './delete-card-form.module.scss'

type DeleteCardProps = {
    id: string
    onCancel: () => void
}

export const DeleteCard = ({id, onCancel}: DeleteCardProps) => {
    const [deleteCard] = useDeleteCardMutation()


    const deleteHandler = () => {
        deleteCard(id)
        onCancel()
    }

    return (
        <>
            {/*<DevTool control={control} />*/}
            <Card className={s.card}>
                <Typography className={s.row}>
                    Do you really want to remove this card?
                </Typography>
                <div className={s.buttons}>
                    <Button variant={"secondary"} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button onClick={deleteHandler}>
                        Delete Card
                    </Button>
                </div>
            </Card>
        </>
    )
}
