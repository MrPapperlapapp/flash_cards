import { SVGProps, Ref, forwardRef, memo } from 'react'

const Edit = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <path
      stroke="#FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 20h8.5M18 10l3-3-4-4-3 3m4 4L8 20H4v-4L14 6m4 4-4-4"
    />
  </svg>
)
const ForwardRef = forwardRef(Edit)
const Memo = memo(ForwardRef)

export { Memo as Edit }
