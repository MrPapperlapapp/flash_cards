import { CSSProperties } from 'react'

import { DevTool } from '@hookform/devtools'
import type { Meta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import { ControlledCheckbox } from './'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

const meta = {
  title: 'Components/Controlled/Checkbox',
  component: ControlledCheckbox,
} satisfies Meta<typeof ControlledCheckbox>

export default meta

type FormValues = Record<'one' | 'two', boolean>

export const ExampleWithForm = {
  render: () => {
    const { control, handleSubmit } = useForm<FormValues>({
      defaultValues: {
        one: false,
        two: false,
      },
    })

    const onSubmit = (data: FormValues) => {
      alert(JSON.stringify(data))
    }

    const styles: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '30px 0',
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '300px' }}>
        <DevTool control={control} />
        <Typography>Form With Controlled Checkbox</Typography>
        <div style={styles}>
          <ControlledCheckbox name="one" control={control} label={'One'} />
          <ControlledCheckbox name="two" control={control} label={'Two'} />
        </div>
        <Button fullWidth>Send</Button>
      </form>
    )
  },
}
