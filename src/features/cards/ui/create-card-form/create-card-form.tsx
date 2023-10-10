import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'
import {z} from 'zod'

import {Button, Card, Typography} from '@/components'
import {ControlledCheckbox} from '@/components/ui/controlled/controlled-checkbox/controlled-checkbox.tsx'
import {ControlledTextField} from '@/components/ui/controlled/controlled-text-field/controlled-text-field.tsx'

const schemaAddCard = z.object({
    email: z.string().email('Invalid email address').nonempty('Enter email'),
    password: z.string().nonempty('Enter password'),
    rememberMe: z.boolean().optional(),
})

export type FormTypeAddCard = z.infer<typeof schemaAddCard>

type Props = {
    onSubmit: (data: FormTypeAddCard) => void
    disabled?: boolean
}

export const CreateNewCard = (props: Props) => {
    const { control, handleSubmit } = useForm<FormTypeAddCard>({
        mode: 'onSubmit',
        resolver: zodResolver(schemaAddCard),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    })

    const handleFormSubmitted = handleSubmit(props.onSubmit)

    return (
        <>
            {/*<DevTool control={control} />*/}
            <Card>
                <Typography variant="large">
                    Sign In
                </Typography>
                <form onSubmit={handleFormSubmitted}>
                    <div>
                        <ControlledTextField label={'Email'} name={'email'} control={control} />
                        <ControlledTextField
                            label={'Password'}
                            name={'password'}
                            control={control}
                        />
                    </div>
                    <ControlledCheckbox

                        label={'Remember me'}
                        control={control}
                        name={'rememberMe'}
                        /*position={'left'}*/
                    />
                    <Typography
                        variant="body2"
                        as={Link}
                        to="/recover-password"
                    >
                        Forgot Password?
                    </Typography>
                    <Button fullWidth type={'submit'} disabled={props.disabled}>
                        Sign In
                    </Button>
                </form>
                <Typography variant="body2">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Don't have an account?
                </Typography>
            </Card>
        </>
    )
}
