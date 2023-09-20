import { FC, ComponentPropsWithoutRef } from 'react'

type IconProps = {
  className: string
} & ComponentPropsWithoutRef<'svg'>

export const Search: FC<IconProps> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 24 24"
      className={className}
      {...rest}
    >
      <path
        stroke="gray"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.954 14.946 21 21m-4-11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
      />
    </svg>
  )
}
