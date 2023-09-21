import { SVGProps, Ref, forwardRef, memo } from 'react'

const More = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
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
      d="M12.005 16.005v-.01M12.005 12.005v-.01M12.005 8.005v-.01"
    />
    <path stroke="#FFF" strokeWidth={2} d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)
const ForwardRef = forwardRef(More)
const Memo = memo(ForwardRef)

export { Memo as More }
