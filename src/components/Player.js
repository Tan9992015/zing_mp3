import React,{useEffect, useRef, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import * as apis from '../apis'
import icons from '../ultis/icons'
import * as actions from '../store/actions'
import moment from 'moment'
import LoadingSong from './LoadingSong'
const {  AiOutlineHeart,
        BsThreeDots,
        MdSkipNext,
        MdSkipPrevious,
        CiRepeat,
        BsFillPlayFill,
        BsPauseFill,
        CiShuffle,
        TbRepeatOnce,
        BsMusicNoteList,
        SlVolumeOff,
        SlVolume2,
        SlVolume1
      } = icons
var intervalId 
const Player = ({setShowSidebarRight}) => {
  const audioEl = useRef(new Audio())
  const {curSongId,isPlaying,songs} = useSelector(app=>app.music)
  const [songInfo,setSongInfo] = useState(null)
  const [source,setSource] = useState(null)
  const [curSecond,setCurSecond] = useState(0)
  const [isShuffle,setIsShuffle] = useState(false)
  const [repeatMode,setRepeatMode] = useState(0) 
  const [isLoadSource,setIsLoadSource] = useState(true)
  const [volume,setVolume] = useState(100)
  // progress bar
  // gán ref = thumbref thì biến thumbref đại diện cho thẻ div đó  
  const thumbRef = useRef()
  const fatherRef = useRef()
  const dispatch = useDispatch()
  // console.log(curSongId)
  // console.log(audioEl)
  // Nếu isPlaying là true, bạn sẽ thấy biểu tượng dừng.
  //Nếu isPlaying là false, bạn sẽ thấy biểu tượng phát.
  useEffect(()=>{
      const fetchDetailSong = async()=>{
        // load source nếu đang lấy api thì vòng quay 
        setIsLoadSource(false)
          const [res1,res2] = await Promise.all([
            apis.getDetailSong(curSongId),
            apis.getSong(curSongId)
          ])
          // load song thì k quay nữa
          setIsLoadSource(true)
          // promise.all đối số là 1 mảng .all là đợi cả 2 cái cùng giải quyết
            if(res1.data.err===0){
              setSongInfo(res1.data.data)
            }
            if(res2.data.err===0){
              setSource(res2.data.data['128'])
            }
          // if(response.data.err === 0){
          //   setSongInfo(response.data.data)
          // }
          // console.log(res1.data)
          // console.log(res2.data)
      }
      fetchDetailSong()
  },[curSongId])

  useEffect(()=>{
    // dispatch(actions.play(true)) cái này sẽ bị chuyển qua list khi click vào dispathc tue để phát nhạc luôn 
    audioEl.current.src = source
    // fix lỗi khi click vào nó play rồi nhưng k phát nhạc lý do lỗi thì xem phút 44 bài 18
    if(isPlaying) audioEl.current.play()
  },[curSongId,source])
// cursong id thay đổi thì source cũng phải thay đổi 
  const handleTogglePlayMusic = ()=>{
    if(isPlaying){
      dispatch(actions.play(false))
      audioEl.current.pause()
    } else {
      audioEl.current.play()
      dispatch(actions.play(true))
    }
}

// xử lý thanh progress bar
useEffect(()=>{
  if(isPlaying){
    intervalId = setInterval(()=>{
      // setinterval trả về 1 id
        // console.log(audioEl.current.currentTime)
        let percent = Math.round(audioEl.current.currentTime * 10000 / songInfo?.duration)/100
        thumbRef.current.style.cssText = `right : ${100-percent}%`
        setCurSecond(Math.round(audioEl.current.currentTime))
    },200)
  } else {
    intervalId && clearInterval(intervalId)
  }
},[isPlaying])

// end song và xử lý 2 nút shuffle 
useEffect(()=>{
  const handleEnded = () =>{
    // console.log('ended')
    if(isShuffle){
      handleShuffle()
    }else if (repeatMode){
     repeatMode === 1 ? handleRepeatOnce() : handleNextSong()
    }else {
      audioEl.current.pause()
      dispatch(actions.play(false))
    }
  }
  audioEl.current.addEventListener('ended',handleEnded)

  return () => {
    audioEl.current.removeEventListener('ended',handleEnded)
  }
},[audioEl.current,isShuffle,repeatMode])
  const handleClickProgressbar = (e)=>{
      // console.log(e)
      // console.log(fatherRef)
      // console.log(fatherRef.current)
      const fatherRect = fatherRef.current.getBoundingClientRect()
      // console.log(fatherRect)
      const percent = Math.round((e.clientX-fatherRect.left)*10000 / fatherRect.width) / 100
      thumbRef.current.style.cssText = `right : ${100-percent}%`
      audioEl.current.currentTime = percent * songInfo?.duration / 100
      setCurSecond(Math.round(audioEl.current.currentTime ))
}

  // next and prev 
  const handleNextSong = ()=>{
    // nếu trong album thì mới cho bấm pause next
    if(songs){
      // songs tồn tại thì đang ở trong playlist
      // mục đích bê thằng songs ra redux cho redux render mà k chuyền cha con nữa vì
      // bê nó ra song checkk curId để biết thằng tiếp theo của thằng hiện tại 
      // vừa là global và đỡ lằng nhằng cha con songs từ Listsongs xong lại chạy sang player lằng nhằng
      // chủ yếu là tính chất global t đoán thế 
        
      let curentSongIndex 
      songs?.forEach((item,index)=>{
        if(item.encodeId === curSongId) curentSongIndex = index
        // bài hiện tại
      })
      dispatch(actions.setCurSongId(songs[curentSongIndex+1]?.encodeId))
      // bài tiếp theo
      // ấn next là bài sau tự play 
      dispatch(actions.play(true))
    }
  }

  const handlePrevSong = ()=>{
   
    if(songs){
      let curentSongIndex 
      songs?.forEach((item,index)=>{
        if(item.encodeId === curSongId) curentSongIndex = index
        // bài hiện tại
      })
      dispatch(actions.setCurSongId(songs[curentSongIndex-1].encodeId))
      // bài trước đó
      // ấn prev là bài sau tự play 
      dispatch(actions.play(true))
    }
  }

  // phát tất cả khi phát xong 1 bài tự động phát bài ngẫu nhiên 
  const handleShuffle = () =>{
      const randomIndex = Math.round(Math.random()* songs?.length) - 1
      dispatch(actions.setCurSongId(songs[randomIndex].encodeId))
      dispatch(actions.play(true))
  }

  // repeat once 
  const handleRepeatOnce = () => {
    // console.log('repeat once')
    audioEl.current.play()
    // khi hết nó tự động chơi lại bài đó 
  }

  //volume
  const handleChangeVolume = (e) => {
    setVolume(e.target.value)
    }
  useEffect(()=>{
    // console.log( audioEl.current.volume )
    audioEl.current.volume = volume / 100
  },[volume])
  return (
     <div className='bg-main-400 px-5 h-full flex '>
     <div className='w-[30%] flex items-center gap-3'>
        <img src={songInfo?.thumbnail}
             alt='thumbnail'
             className='w-16 h-16 object-cover rounded-[50%]'
         />
         <div className='flex flex-col '>
            <span className='font-semibold text-gray-700 text-[14px]'>{songInfo?.title}</span>
            <span className='text-[12px] text-gray-500'>{songInfo?.artistsNames}</span>
         </div>
         <div className='flex gap-4 pl-2'>
          <span>
            <AiOutlineHeart size={16}/>
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
         </div>
     </div>
     <div className='w-[40%] flex flex-col py-2'> 
        <div className='flex gap-8 justify-center items-center'>
            <span className={`cursor-pointer ${isShuffle ? 'text-purple-600' : 'text-black'}`}  title='bật phát ngẫu nhiên'
                    onClick={()=>setIsShuffle(prev=>!prev)}
            >
              <CiShuffle size={24}/>
            </span>
            <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} onClick={handlePrevSong}><MdSkipPrevious  size={24}/></span>
            <span className='cursor-pointer border border-gray-700 rounded-[50%] p-1 hover:text-main-500'
                  onClick={handleTogglePlayMusic}
            >
              { 
                  !isLoadSource ? <LoadingSong /> : isPlaying ?  <BsPauseFill  size={30}/> : < BsFillPlayFill size={30} /> 
              }
            </span>
            <span className={`${!songs ? 'text-gray-500' : 'cursor-pointer'}`} onClick={handleNextSong}><MdSkipNext  size={24}/></span>
            <span className={`cursor-pointer ${repeatMode && 'text-purple-600'}`} title='phát lại tất cả'
                  onClick={()=>setRepeatMode(prev=> prev === 2 ? 0 : prev + 1 )}
            >
                {repeatMode === 1 ? <TbRepeatOnce size={24} />  : <CiRepeat size={24}/>}
            </span>
        </div>
        <div className='w-full flex justify-center items-center gap-2 text-xs mt-[4px]'>
          <span>{moment.utc(curSecond * 1000).format('mm:ss')}</span>
            <div className='w-3/4 m-auto h-[3px] hover:h-[6px] cursor-pointer relative bg-[rgba(0,0,0,0.1)] rounded-l-full rounded-r-full'
                  onClick={handleClickProgressbar}
                  ref={fatherRef}
            >
                <div ref={thumbRef} className='absolute top-0 left-0 h-full  bg-[#0e8080] rounded-l-full rounded-r-full'></div>
            </div>
          <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
        </div>

     </div>
     <div className='w-[30%] flex items-center justify-end gap-4'>
        <div className='flex gap-2 items-center'>
          <span onClick={()=>setVolume(prev => +prev===0 ? 70 : 0)}>
            {+volume >= 50 ? <SlVolume2/> : +volume === 0 ? <SlVolumeOff/> : <SlVolume1/> }
          </span>
          <input type='range' 
                step={1} 
                min={0} 
                max={100}
                value={volume}
                onChange={handleChangeVolume}
          />
          </div>
        <span className='p-1 cursor-pointer rounded-md bg-main-500 opacity-90 hover:opacity-100'
              onClick={()=>setShowSidebarRight(prev => !prev)}
        >
          <BsMusicNoteList size={20} />
        </span>
     </div>
  </div>
  )
}

export default Player