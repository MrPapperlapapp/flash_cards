import {RadioGroup} from '@/components/ui/radio-group/radio-group'

export function App() {
  return (
    <>
      <span>Hallo</span>
        <RadioGroup options={[{label: '1', value: '1'},{label: '2', value: '2'}]}></RadioGroup>
    </>
  )
}
