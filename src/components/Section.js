import React,{memo} from 'react'

import { useNavigate } from 'react-router-dom'
const Section = ({data}) => {
  
    const navigate = useNavigate()
   
  return (
    <div className='mt-[20px] px-[59px] flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
            <h3 className='text-[20px] font-bold'>{data?.title}</h3>
            <span className='text-xs'>Tất cả</span>
        </div>
        <div className='flex items-start justify-between gap-[14px]'>
            {data?.items?.filter((item,index) => index <= 4).map(item => (
                <div 
                key={item.encodeId}
                className='flex flex-col flex-auto w-1/5 text-sm gap-3'
                onClick={()=>{
                    navigate(item.link.split('.')[0])
                }}
                >
                    <img src={item.thumbnail} alt='data' className='w-full h-auto rounded-lg cursor-pointer'/>
                    <span className='flex flex-col'>
                        <span className='font-semibold'>{item.title}</span>
                        <span>
                            {
                                data?.sectionId === 'h100' ? <span>{item.artistsNames}</span>  : 
                               <span>{ 
                                item.sortDescription?.length >= 40 ? `${item.sortDescription?.slice(0,30)}...` 
                                : item.sortDescription 
                                }
                                </span>
                            }
                        </span>
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default memo(Section)