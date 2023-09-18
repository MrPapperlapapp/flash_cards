import { SVGProps, Ref, forwardRef, memo } from 'react'

const UncheckedIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" fill="none" ref={ref} {...props}>
    <path
      fill="currentColor"
      d="M19 5v14H5V5h14Zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z"
    />
  </svg>
)
const ForwardRef = forwardRef(UncheckedIcon)
const Memo = memo(ForwardRef)

export { Memo as UncheckedIcon }
