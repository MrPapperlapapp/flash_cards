import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {Button, Card, ControlledFileUploader, Typography} from '@/components'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'
import {Upload} from "@/assets/icons/upload/upload.tsx";
import s from "./create-card-form.module.scss"
import noCover from "@/assets/icons/upload/no-cover.svg";
import {useState} from "react";

const schemaAddCard = z.object({
    question: z.string().min(3).max(30),
    answer: z.string().min(3).max(30),
    questionImg: z.any(),
    answerImg: z.any(),
})

export type FormTypeAddCard = z.infer<typeof schemaAddCard>

type Props = {
    onSubmit: (data: FormTypeAddCard) => void
    onCancel: () => void
}

export const CreateNewCard = ({onSubmit, onCancel}: Props) => {
    const [downloaded, setDownloaded] = useState<string>('')

    const [imgError, setImgError] = useState('')
    const {control, handleSubmit, watch, trigger, getFieldState, resetField} = useForm<FormTypeAddCard>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaAddCard),
        defaultValues: {
            question: '',
            answer: '',
            questionImg: '',
            answerImg: '',
        },
    })
    const extraActions = async () => {
        const success = await trigger('questionImg')

        const {error} = getFieldState('questionImg')

        const file = watch('questionImg')

        if (!success && error?.message) {
            setImgError(error.message)

            resetField('questionImg')
        }

        if (file) {

            const img = success ? URL.createObjectURL(file) : ''

            setDownloaded(img)

            if (imgError) setImgError('')
        }
    }

    const handleFormSubmitted = handleSubmit(onSubmit)

    return (
        <>
            {/*<DevTool control={control} />*/}
            <Card>
                <Typography variant="large">
                    Add New Card
                </Typography>
                <form onSubmit={handleFormSubmitted}>
                    <div>
                        <ControlledTextField label={'question'} name={'question'} control={control}/>
                        <ControlledTextField label={'answer'} name={'answer'} control={control}/>
                        <img src={downloaded || noCover} alt={'img'} className={s.image} />
                        {imgError && (
                            <Typography variant="caption" className={s.error}>
                                {imgError}
                            </Typography>
                        )}
                        <ControlledFileUploader
                            control={control}
                            name="questionImg"
                            variant="secondary"
                            extraActions={extraActions}
                            fullWidth
                        >
                            <Upload className={s.imgIcon}/>
                            Image Question
                        </ControlledFileUploader>
                    </div>
                    <Button variant={"secondary"} onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type={'submit'}>
                        Add New Card
                    </Button>
                </form>
            </Card>
        </>
    )
}
