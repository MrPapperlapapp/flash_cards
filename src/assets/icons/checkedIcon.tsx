import { SVGProps, Ref, forwardRef, memo } from 'react'

import s from '../../components/ui/checkbox/checkbox.module.scss'
const CheckedIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" ref={ref} {...props}>
    <path fill="currentColor" d="M4 6h16v12H4z" className={s.check} />
    <path
      fill="currentColor"
      d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z"
    />
  </svg>
)
const ForwardRef = forwardRef(CheckedIcon)
const Memo = memo(ForwardRef)

export { Memo as CheckedIcon }
