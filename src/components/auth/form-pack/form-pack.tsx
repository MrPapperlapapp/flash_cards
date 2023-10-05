import { FC, useState } from 'react'

import { clsx } from 'clsx'

import s from './form-pack.module.scss'

import noCover from '@/assets/icons/upload/no-cover.svg'
import { Upload } from '@/assets/icons/upload/upload.tsx'
import {
  Button,
  ControlledCheckbox,
  ControlledFileUploader,
  ControlledTextField,
  Typography,
} from '@/components'
import { PackFormType, usePackForm } from '@/components/auth/form-pack/use-pack-form.ts'

export type PackFormDV = {
  cover: string | null
} & Pick<PackFormType, 'name' | 'isPrivate'>

type Props = {
  onSubmit: (data: FormData) => void
  defaultValues?: PackFormDV
  onCancel: () => void
  className?: string
  nameButton?: string
}

export const PackForm: FC<Props> = ({
  onSubmit,
  defaultValues,
  onCancel,
  nameButton = 'Save',
  className,
}) => {
  const [downloaded, setDownloaded] = useState<string>(defaultValues?.cover || '')

  const [coverError, setCoverError] = useState('')

  const values: PackFormType = {
    name: defaultValues?.name || '',
    isPrivate: defaultValues?.isPrivate || false,
  }

  const { watch, control, trigger, resetField, handleSubmit, getFieldState } = usePackForm(values)

  const fileIsDirty = getFieldState('cover').isDirty

  const extraActions = async () => {
    const success = await trigger('cover')

    const { error } = getFieldState('cover')

    const file = watch('cover')

    if (!success && error?.message) {
      setCoverError(error.message)

      resetField('cover')
    }

    if (file) {
      const badCase = defaultValues?.cover ? defaultValues.cover : ''
      const img = success ? URL.createObjectURL(file) : badCase

      setDownloaded(img)

      if (coverError) setCoverError('')
    }
  }

  const sendHandler = (data: PackFormType) => {
    let form = new FormData()

    form.append('name', `${data.name}`)
    form.append('isPrivate', `${data.isPrivate}`)
    fileIsDirty && form.append('cover', data.cover || '')
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit(sendHandler)} className={clsx(s.form, className)}>
      {/*<DevTool control={control} />*/}
      <img src={downloaded || noCover} alt={'img'} className={s.image} />
      {coverError && (
        <Typography variant="caption" className={s.error}>
          {coverError}
        </Typography>
      )}
      <ControlledFileUploader
        control={control}
        name="cover"
        variant="secondary"
        extraActions={extraActions}
        fullWidth
      >
        <Upload className={s.imgIcon} />
        Change Cover
      </ControlledFileUploader>
      <ControlledTextField control={control} name={'name'} label="Name Pack" />
      <ControlledCheckbox control={control} name={'isPrivate'} label="Private Pack" />
      <div className={s.controls}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button>{nameButton}</Button>
      </div>
    </form>
  )
}
