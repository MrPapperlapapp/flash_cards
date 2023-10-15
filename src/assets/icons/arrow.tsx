import { SVGProps, Ref, forwardRef, memo } from 'react'

const Arrow = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none" {...props} ref={ref}>
    <g clipPath="url(#a)">
      <path
        fill="#fff"
        d="M19 11H7.14l3.63-4.36a1.001 1.001 0 0 0-1.54-1.28l-5 6a1.191 1.191 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13.026.052.056.102.09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .77-1.64L7.14 13H19a1 1 0 0 0 0-2Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(Arrow)
const Memo = memo(ForwardRef)

export { Memo as Arrow }
