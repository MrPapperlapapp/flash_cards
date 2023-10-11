import {Button, Card, Typography} from '@/components'
import {useDeleteCardMutation} from "@/features/cards/model";


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
            <Card>
                <Typography>Do you really want to remove this card?

                    All cards will be deleted.</Typography>
                <Button variant={"secondary"} onClick={onCancel}>
                    Cancel
                </Button>
                <Button onClick={deleteHandler}>
                    Delete Card
                </Button>
            </Card>
        </>
    )
}
