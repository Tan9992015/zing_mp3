import React from 'react'

const SongItems = ({thumbnail,title,artist}) => {
  return (
    <div className='width-[30%] flex-auto flex border border-red-500 gap-[10px]'>
        <img src={thumbnail} alt='thubmnail' className='w-[60px] h-[60px] object-cover rounded-md' />
        <div className='flex flex-col'>
            <span className='text-sm font-semibold'>{title}</span>
            <span className='text-xs text-gray-400'>{artist}</span>
        </div>
    </div>
  )
}

export default SongItems