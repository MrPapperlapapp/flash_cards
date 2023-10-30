import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {Button, Card, ControlledFileUploader, Typography} from '@/components'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'
import {Upload} from "@/assets/icons/upload/upload.tsx";
import s from "./create-card-form.module.scss"
import noCover from "@/assets/icons/upload/no-cover.svg";
import {useState} from "react";
import {useCreateCardMutation} from "@/features/cards/model";
import {toast} from "react-toastify";

const schemaAddCard = z.object({
    question: z.string().min(3).max(30),
    answer: z.string().min(3).max(30),
    questionImg: z.instanceof(File)
        .refine(file => file.size <= 1000000, `Max image size is 1MB.`)
        .refine(
            file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
        )
        .optional(),
    answerImg: z.instanceof(File)
        .refine(file => file.size <= 1000000, `Max image size is 1MB.`)
        .refine(
            file => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.'
        )
        .optional(),
})

export type FormTypeAddCard = z.infer<typeof schemaAddCard>

type Props = {
    onSubmit: () => void
    id: string
    onCancel: () => void
}

export const CreateNewCard = ({id, onCancel, onSubmit}: Props) => {
    const [downloadedQuestionImg, setDownloadedQuestionImg] = useState<string>('')
    const [downloadedAnswerImg, setDownloadedAnswerImg] = useState<string>('')
    const [createCard] = useCreateCardMutation()

    const [questionImgError, setQuestionImgError] = useState('')
    const [answerImgError, setAnswerImgError] = useState('')
    const {control, handleSubmit, getValues, watch, trigger, getFieldState, resetField} = useForm<FormTypeAddCard>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaAddCard),
        defaultValues: {
            question: '',
            answer: '',
        },
    })
    const extraActionsQuestionImg = async () => {
        const success = await trigger('questionImg')

        const {error} = getFieldState('questionImg')

        const file = watch('questionImg')

        if (!success && error?.message) {
            setQuestionImgError(error.message)

            resetField('questionImg')
        }

        if (file) {

            const img = success ? URL.createObjectURL(file) : ''

            setDownloadedQuestionImg(img)

            if (questionImgError) setQuestionImgError('')
        }
    }

    const extraActionsAnswerImg = async () => {
        const success = await trigger('answerImg')

        const {error} = getFieldState('answerImg')

        const file = watch('answerImg')

        if (!success && error?.message) {
            setQuestionImgError(error.message)

            resetField('answerImg')
        }

        if (file) {

            const img = success ? URL.createObjectURL(file) : ''

            setDownloadedAnswerImg(img)

            if (answerImgError) setAnswerImgError('')
        }
    }

    const handleFormSubmitted = (data: FormTypeAddCard) => {
        const form = new FormData()

        form.append('question', getValues().question)
        form.append('answer', getValues().answer)
        data.questionImg && form.append('questionImg', data.questionImg)
        data.answerImg && form.append('answerImg', data.answerImg)

        createCard({id, form})
            .unwrap()
            .catch(e => {
                e.status === 'FETCH_ERROR'
                    ? toast.error('No internet connection')
                    : toast.error(e.data.message)
            })
        onSubmit()
    }

    return (
        <>
            {/*<DevTool control={control} />*/}
            <Card className={s.card}>
                <form onSubmit={handleSubmit(handleFormSubmitted)}>
                    <div>
                        <ControlledTextField className={s.row} label={'Question'} name={'question'} control={control}/>
                        <ControlledTextField className={s.row} label={'Answer'} name={'answer'} control={control}/>
                        <div className={s.row}>
                            <img src={downloadedQuestionImg || noCover} alt={'img'} className={s.image}/>
                            {questionImgError && (
                                <Typography variant="caption" className={s.error}>
                                    {questionImgError}
                                </Typography>
                            )}
                            <ControlledFileUploader
                                control={control}
                                name="questionImg"
                                variant="secondary"
                                extraActions={extraActionsQuestionImg}
                                fullWidth
                            >
                                <Upload className={s.imgIcon}/>
                                Image Question
                            </ControlledFileUploader>
                        </div>
                        <div className={s.row}>
                            <img src={downloadedAnswerImg || noCover} alt={'img'} className={s.image}/>
                            {questionImgError && (
                                <Typography variant="caption" className={s.error}>
                                    {answerImgError}
                                </Typography>
                            )}
                            <ControlledFileUploader
                                control={control}
                                name="answerImg"
                                variant="secondary"
                                extraActions={extraActionsAnswerImg}
                                fullWidth
                            >
                                <Upload className={s.imgIcon}/>
                                Image Answer
                            </ControlledFileUploader>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <Button variant={"secondary"} onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type={'submit'}>
                            Add New Card
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    )
}
