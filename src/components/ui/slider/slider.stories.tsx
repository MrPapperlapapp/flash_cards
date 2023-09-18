import { useState } from 'react'

import { Meta } from '@storybook/react'

import { Slider } from './'

const meta = {
    title: 'Components/Slider',
    component: Slider,
    tags: ['autodocs'],
} satisfies Meta<typeof Slider>

export default meta

export const SliderRange = () => {
    const [data, setData] = useState([25, 75])

    const onChangeData = (e: number[]) => {
        setData(e)
    }

    return <Slider value={data} onValueChange={onChangeData} />
}
