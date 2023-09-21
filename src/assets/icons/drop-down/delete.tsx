import { SVGProps, Ref, forwardRef, memo } from 'react'

const Delete = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      strokeWidth={2}
      d="M4 7h16M6 7v11a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V7M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2H9V5Z"
    />
  </svg>
)
const ForwardRef = forwardRef(Delete)
const Memo = memo(ForwardRef)

export { Memo as Delete }
