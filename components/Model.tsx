import React from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState, useRecoilValue } from 'recoil'
import { modelstate } from '../atoms/atom'
import { XIcon } from '@heroicons/react/outline'
function Model() {
    const [model,setmodel] = useRecoilState(modelstate)
    const handelclose = ()=>{
              setmodel(false)
    }
  return (
    <MuiModal open={model} onClose={handelclose}>
        <>
        <button onClick={handelclose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
            <XIcon className='h-6 w-6'/>
            </button>
        </>
    </MuiModal>
  )
}

export default Model