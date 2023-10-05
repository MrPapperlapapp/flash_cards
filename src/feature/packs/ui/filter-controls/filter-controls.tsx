import { FC, memo } from 'react'

import s from './filter-controls.module.scss'

import { Delete } from '@/assets/icons/drop-down/delete.tsx'
import { Button, Tabs, TabsType, TextField, Typography } from '@/components'
import { Slider } from '@/components/ui/slider'

type Props = {
  searchName: string
  setSearchName: (newString: string) => void
  sliderValue: number[]
  sliderMaxValue?: number
  setSliderValue: (newValue: number[]) => void
  tabValue: string
  setTabValue: (newTab: string) => void
}
export const FilterControls: FC<Props> = memo(
  ({
    searchName,
    setSearchName,
    sliderValue,
    sliderMaxValue = 10,
    setSliderValue,
    tabValue,
    setTabValue,
  }) => {
    const tabs: TabsType[] = [
      { value: 'userId', label: 'My cards' }, //поменять 'userId', когда будет авторизация
      { value: '', label: 'All cards' },
    ]

    const clearFilterHandler = () => {
      setSliderValue([0, sliderMaxValue])
      setSearchName('')
      setTabValue('')
    }

    const onClearTextField = () => {
      setSearchName('')
    }

    return (
      <div className={s.filter}>
        <TextField
          type="search"
          className={s.textField}
          value={searchName}
          onChange={e => setSearchName(e.currentTarget.value)}
          clearField={onClearTextField}
        />
        <div className={s.box}>
          <Typography variant="body2">Show packs cards</Typography>
          <Tabs tabs={tabs} value={tabValue} onValueChange={setTabValue} className={s.tabs} />
        </div>
        <div className={s.box}>
          <Typography variant="body2">Number of cards</Typography>
          <Slider
            value={sliderValue}
            onValueChange={setSliderValue}
            max={sliderMaxValue}
            className={s.slider}
          />
        </div>
        <Button variant="secondary" onClick={clearFilterHandler} className={s.button}>
          <Delete className={s.icon} />
          Clear Filter
        </Button>
      </div>
    )
  }
)
