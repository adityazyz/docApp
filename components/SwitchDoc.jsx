// appointment status switch ... in admin dashboard 
import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import axios from 'axios'

export default function SwitchDoc({email}) {
  const [enabled, setEnabled] = useState(false); 

  const activateAccount = ()=>{
    axios.put("/api/updateDoctors", {Email : email, AccountStatus : 1})
    .catch((error)=>console.log(error.message))
  }

  const deactivateAccount = ()=>{
    axios.put("/api/updateDoctors", {Email : email, AccountStatus : 0})
    .catch((error)=>console.log(error.message))
  }
 

  useEffect(() => {
    
  axios.get(`/api/getDoctors?email=${email}`)
  .then((response)=>{
    if(response.data.AccountStatus === 0){
        setEnabled(false);
    }else if(response.data.AccountStatus === 1){
        setEnabled(true)
    }
  })
  .catch((error)=>{console.log(error.message)})

  }, [])
  

  return (
    <div className=' w-20'> 
      <Switch
        checked={enabled}
        onChange={()=>{
            // first check if already activated...deactivate on change..or vice-versa
            (enabled === true) ? deactivateAccount() : activateAccount();
 
            // now change the value of enabled
            enabled === true ? setEnabled(false) : setEnabled(true)
        }}
        className={`${enabled ? 'bg-[#40BF56]' : 'bg-[#E52801]'}
          relative inline-flex h-[26px] w-[50px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-6' : 'translate-x-1'}
            pointer-events-none inline-block h-[18px] mt-[2px]  w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  )
}
