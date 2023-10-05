import { FC } from 'react'

import s from '../grade/grade.module.scss'
import Star from "@/assets/icons/star.tsx";
import StarOutline from "@/assets/icons/star-outline.tsx";

export type RatingValue = 0 | 1 | 2 | 3 | 4 | 5

type GradeProps = {
    value: RatingValue
    onClick: (value: RatingValue) => void
}

export const Grade: FC<GradeProps> = ({ value, onClick }) => {
    return (
        <div className={s.container}>
            <StarItem value={1} onClick={onClick} selected={value > 0} />
            <StarItem value={2} onClick={onClick} selected={value > 1} />
            <StarItem value={3} onClick={onClick} selected={value > 2} />
            <StarItem value={4} onClick={onClick} selected={value > 3} />
            <StarItem value={5} onClick={onClick} selected={value > 4} />
        </div>
    )
}

type StarItemProps = {
    value: RatingValue
    selected: boolean
    onClick: (value: RatingValue) => void
}

const StarItem: FC<StarItemProps> = ({ value, selected, onClick }) => {
    return (
        <button
            onClick={() => {
                onClick(value)
            }}
            className={s.button}
        >
            {selected ? <Star /> : <StarOutline />}
        </button>
    )
}