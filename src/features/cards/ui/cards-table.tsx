import {FC, memo} from 'react'

import s from './card-table.module.scss'

import {Column, Table, TableHeaderProps} from '@/components/ui/table'
import {Card} from "@/features/cards/model";
import {Grade} from "@/components";
import {Edit} from "@/assets/icons/drop-down/edit.tsx";
import {Delete} from "@/assets/icons/drop-down/delete.tsx";

const columnsMy: Column[] = [
    {
        key: 'question',
        title: 'Question',
        sortable: true,
    },
    {
        key: 'answer',
        title: 'Answer',
        sortable: true,
    },
    {
        key: 'updated',
        title: 'Last Updated',
        sortable: true,
    },
    {
        key: 'grade',
        title: 'Grade',
    },
    {
        key: 'options',
        title: '',
    },
]

const columns: Column[] = [
    {
        key: 'question',
        title: 'Question',
        sortable: true,
    },
    {
        key: 'answer',
        title: 'Answer',
        sortable: true,
    },
    {
        key: 'updated',
        title: 'Last Updated',
        sortable: true,
    },
    {
        key: 'grade',
        title: 'Grade',
    },
]

type Props = {
    items?: Card[]
    isMyPack: boolean
    onClickDelete: (open: boolean) => void
    onClickEdit: (open: boolean) => void
    setDeleteOrEditCardId: (id: string) => void
} & Pick<TableHeaderProps, 'sort' | 'onSort'>

export const CardsTable: FC<Props> = memo(({
                                               items,
                                               isMyPack,
                                               onClickDelete,
                                               onClickEdit,
                                               setDeleteOrEditCardId,
                                               ...rest
                                           }) => {
    if (!items?.length) {
        return <div className={s.empty}>Can't find any cards</div>
    }

    const deleteHandler = (id: string) => {
        setDeleteOrEditCardId(id)
        onClickDelete(true)
    }

    const editHandler = (id: string) => {
        setDeleteOrEditCardId(id)
        onClickEdit(true)
    }

    return (
        <Table.Root className={s.container}>
            <Table.Header columns={isMyPack ? columnsMy : columns} {...rest} />
            <Table.Body>
                {items.map(card => (

                    <Table.Row key={card.id}>
                        <Table.Cell>
                            <div className={s.cellWithImage}>
                                {card.questionImg &&
                                    <img src={card.questionImg} alt="question image" className={s.cover}/>}
                                {card.question}
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div className={s.cellWithImage}>
                                {card.answerImg && <img src={card.answerImg} alt="answer image" className={s.cover}/>}
                                {card.answer}
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            {new Date(card.updated).toLocaleDateString()}
                        </Table.Cell>
                        <Table.Cell>
                            {/*TODO on click*/}
                            <Grade value={card.grade} onClick={() => {
                            }}/>
                        </Table.Cell>
                        {isMyPack && <Table.Cell>
                            <Edit className={s.icon} onClick={() => editHandler(card.id)}/>
                            <Delete className={s.icon} onClick={() => deleteHandler(card.id)}/>
                        </Table.Cell>}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
})
