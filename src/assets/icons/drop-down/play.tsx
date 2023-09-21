import { SVGProps, Ref, forwardRef, memo } from 'react'

const Play = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
    ref={ref}
    {...props}
  >
    <circle cx={12} cy={12} r={10} stroke="#FFF" strokeWidth={1.5} />
    <path
      stroke="#FFF"
      strokeWidth={1.5}
      d="M15.414 10.941c.781.462.781 1.656 0 2.118l-4.72 2.787C9.934 16.294 9 15.71 9 14.786V9.214c0-.924.934-1.507 1.694-1.059l4.72 2.787Z"
    />
  </svg>
)
const ForwardRef = forwardRef(Play)
const Memo = memo(ForwardRef)

export { Memo as Play }
