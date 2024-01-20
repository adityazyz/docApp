// appointment status switch ... in admin dashboard 
import { useState } from 'react'
import { Switch } from '@headlessui/react'

export default function ApStSwitch() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-[#40BF56]' : 'bg-[#E52801]'}
          relative inline-flex h-[32px] w-[55px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-7' : 'translate-x-1'}
            pointer-events-none inline-block h-[20px] mt-1  w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
