import React from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarLeft,SidebarRight,Player,Header,LoadingSong } from '../../components'
import { useState } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
// có oulet thì mới hiển thị được thằng con trong router
// nếu k có thì nó mặc định chỉ có thằng cha thôi ở đây cha là public con là home
// có thì nó hiển thị cả public và home theo quan hệ cha con
const Public = () => {
  const [showSidebarRight,setShowSidebarRight] = useState(true)
  const {isLoading} = useSelector(state => state.app)
  return (
    // overfolow y auto không set cứng chiều dọc khi chiều dọc vượt quá giao diện thì sẽ xuất hiện thanh cuộn
    // min height screen chiều cao nhỏ nhất là full màn hình
    // flex-none phần tử k đc phép mở rộng giữ nguyên kích thước ban đâu trái ngược với flex autio
    // mind width 1600 trên 1600 flex dưới 16000 hidden
    // min-h-screen thì chiều cao ít nhất sẽ là chiều cao màn hình ngay cả khi nó k đủ kích thước
    // min-h-screen nếu phần tử vượt quá sẽ cuộn cho cả màn hình chứ k riêng phần tử
    // Lớp h-screen được sử dụng để thiết lập chiều cao chính xác cho phần tử bằng với chiều cao của màn hình. Nếu nội dung trong phần tử vượt quá chiều cao của màn hình, phần tử có thể trở nên cuộn lên/xuống để xem toàn bộ nội dung.
    <div className='w-full relative h-screen flex flex-col  bg-[#CED9D9]'>
      <div className=' w-full h-full flex flex-auto'> 
      <div className='w-[240px] h-full  flex-none border border-blue-500'>
          <SidebarLeft/>
      </div>

      <div className='flex-auto relative flex flex-col border border-red-500'>
          {
            isLoading && <div className='flex absolute z-10 top-0 bottom-0 left-0 right-0 bg-overlay-30 items-center justify-center'>
            <LoadingSong height={200} width={200}/>
          </div>
          }
        <div className='h-[70px] px-[59px] flex-none flex items-center'>
          <Header/>
        </div>
        <div className='flex-auto w-full'>
            <Scrollbars style={{ width: '100%', height: '100%' }}>
              <Outlet/>
            </Scrollbars>
        </div>
      </div>

      { showSidebarRight && <div className='w-[329px] hidden laptop:flex flex-none border border-blue-500 animate-slide-left'>
                              <SidebarRight/>
                            </div>
      }
      </div>
      <div className='w-full fixed bottom-0 left-0 right-0 h-[90px] z-30'>
        <Player setShowSidebarRight={setShowSidebarRight} />
      </div>
    </div>
  )
}
export default Public