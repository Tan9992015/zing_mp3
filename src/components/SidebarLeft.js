import React from 'react'
import logo from '../assets/logo.svg'
import { menuSidebar } from '../ultis/menuSidebar'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../ultis/path'
// sự khác biệt giữa thẻ link và NavLink là NavLink className còn trả về kết quả khi biết thằng nào active
// nhìn vào calssname của item để hiểu isactive là của thư viện nha
// If the URL is longer than to path, it will no longer be considered active.
const notActiveStyle = 'flex py-2 px-[25px] text-[#32323D]  text-[13px]  font-bold gap-3 items-center'
const activeStyle ='flex py-2 px-[25px] text-[#0F7070]  text-[13px] font-bold gap-3 items-center'
const SidebarLeft = () => {
    const navigate = useNavigate()
  return (
    <div className='flex h-full flex-col bg-[#DDE4E4]'>
        <div className='w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center cursor-pointer'
                onClick = {()=>navigate(path.HOME)}
        >
            <img src={logo} alt='loading' className='w-[120px] h-10'/>
        </div>
        <div className='flex flex-col'>
            {
                menuSidebar.map((item) => (
                    <NavLink 
                        to={item.path} 
                        className={({isActive}) => isActive ? activeStyle : notActiveStyle}
                        end ={item.end}
                    >
                        {item.icon}
                        <span>{item.text}</span>
                    </NavLink>
                ))
            }
        </div>
    </div>
  )
}

export default SidebarLeft