import { FC } from 'react'

import * as SliderRadix from '@radix-ui/react-slider'
import { clsx } from 'clsx'

import s from './slider.module.scss'

import { Typography } from '@/components/ui/typography'

type PropsType = {
  value: number[]
  onValueChange: (value: number[]) => void
  min?: number
  max?: number
  className?: string
}
export const Slider: FC<PropsType> = ({ value, onValueChange, min = 0, max = 10, className }) => (
  <div className={clsx(s.sliderContainer, className)}>
    <div className={s.valueLabel}>
      <Typography variant={'body1'}>{value[0]}</Typography>
    </div>
    <SliderRadix.Root
      className={clsx(s.sliderRoot)}
      value={value}
      max={max}
      min={min}
      step={1}
      minStepsBetweenThumbs={1}
      onValueChange={onValueChange}
    >
      <SliderRadix.Track className={s.sliderTrack}>
        <SliderRadix.Range className={s.sliderRange} />
      </SliderRadix.Track>
      <SliderRadix.Thumb className={s.sliderThumb} aria-label="Volume" />
      <SliderRadix.Thumb className={s.sliderThumb} aria-label="Volume" />
    </SliderRadix.Root>
    <div className={s.valueLabel}>
      <Typography variant={'body1'}>{value[1]}</Typography>
    </div>
  </div>
)
