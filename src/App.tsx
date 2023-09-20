import {RadioGroup} from '@/components/ui/radio-group/radio-group'

export function App() {
  return (
    <>
      <span>Hallo</span>
        <div >
            <RadioGroup  name={'asdasdasd'} options={[{label: 'Apple', value: '1'},{label: 'Ololo', value: '2'},{label: 'Trololo', value: '3'}]}></RadioGroup>
        </div>
    </>
  )
}
