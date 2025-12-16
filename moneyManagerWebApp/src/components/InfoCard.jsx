
import React from 'react'

const InfoCard = ({icon,label,value,color}) => {
  return (
    <div className='flex bg-gray-200 p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 gap-3' >
      <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl `} >
        {icon}
      </div>

        <div>
            <h6 className='text-sm text-[15px] font-semibold text-gray-500 mb-1' >
                {label}
            </h6>
            <span className=' text-[15px] font-semibold sm:text-[18px]' > ${value} </span>
        </div>

    </div>
  )
}

export default InfoCard

