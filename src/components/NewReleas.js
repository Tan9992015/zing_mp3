import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import SongItems from './SongItems'
const NewReleas = () => {
    const {newReleas} = useSelector(state => state.app)
     const [isActive,setIsActive] = useState(0)
  return (
    <div className='mt-[20px] px-[59px] flex flex-col  gap-5'>
         <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold'>{newReleas?.title}</h3>
            <span className='text-xs'>Tất cả</span>
        </div>
        <div className='flex items-center gap-5 text-xs'> 
            <button
                type='button'
                className= {`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent 
                
                ${isActive===0 && 'bg-main-500 text-white'}`}
            >
                VIET NAM
            </button>
            <button
                type='button'
                className= {`py-1 px-4 rounded-l-full rounded-r-full border border-gray-400 bg-transparent 
                ${isActive===1 && 'bg-main-500 text-white'}`}
            >
               QUOC TE
            </button>
        </div>
        <div className='flex flex-wrap w-full gap-4'>
            {newReleas?.items?.vPop?.map(item =>(
                <SongItems thumbnail={item.thumbnail} 
                           key={item.encodeId}
                            title={item.title}
                            artist={item.artistsNames}
                />
            ))}
        </div>
    </div>
  )
}

export default NewReleas