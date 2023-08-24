import React from 'react'
import icons from '../ultis/icons'
const {FiSearch} = icons
const Search = () => {
  return (
    <div className='flex items-center w-full'> 
    <span className='pl-4 flex h-10 items-center bg-[#DDE4E4] rounded-l-[20px] text-gray-500'>
      <FiSearch size={24}/>
    </span>
        <input 
        type='text' className='outline-none w-full px-4 py-2 bg-[#DDE4E4] rounded-r-[20px] h-10 text-gray-500'
        placeholder='tìm kiếm bài hát, nghệ sĩ, lời bài hát....'
        />
    </div>
  )
}

export default Search