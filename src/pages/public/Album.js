import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import * as apis from '../../apis'
import moment from 'moment'
import { ListSongs,AudioLoading} from '../../components'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch,useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import icons from '../../ultis/icons'

const {BsFillPlayFill} = icons
// use param lấy param từ url
const Album = () => {
    const {isPlaying} = useSelector(app=>app.music)
    const dispatch = useDispatch()
    const {title,pid} = useParams()
    const [playlistData,setPlaylistData] =useState(null)
    // console.log(title,pid)
    useEffect(()=> {
            const apifetchDetailPlaylist = async()=>{
            // loading khi đang lấy api 
                dispatch(actions.loading(true))
    
            const response = await apis.getDetailPlaylist(pid)
            // console.log(response)
            // khi có data rồi đ loading nữa
            dispatch(actions.loading(false))
            if(response.data.err===0){
                setPlaylistData(response.data.data)
                dispatch(actions.setPlaylist(response?.data?.data?.song?.items))
            }
            // console.log(playlistData)
        }
        apifetchDetailPlaylist()
    },[pid])
  return (
      <div className='flex gap-8 w-full h-full px-[59px] animate-scale-center'>
        <div className='flex-none w-1/4 flex flex-col items-start gap-2'>
                <div className='w-full relative overflow-hidden'>
                    <img src={playlistData?.thumbnailM} 
                    alt='anh yeu em' 
                    className={`'w-full object-contain ${isPlaying ? 'rounded-full animate-rotate-center' : 'rounded-md animate-rotate-center-pause'  } shadow-md'`} 
                    />
                    <div className='absolute top-0 bottom-0 right-0 left-0 hover:bg-overlay-30 flex items-center justify-center'>
                         <span className='p-3 border border-white rounded-full'>
                            {isPlaying ? <AudioLoading/> : <BsFillPlayFill size={20} color='white'/>}
                         </span>
                    </div>
                </div>
           <div className='flex flex-col'>
                <h3 className='text-[25px] font-bold text-gray-800'>{playlistData?.title}</h3>
                <div className='flex gap-2 items-center text-gray-500 text-xs'>
                    <span>cập nhật :</span>
                    <span>{moment.unix(playlistData?.contentLastUpdate).format("MM/DD/YYYY")}</span>
                </div>
                <span className='flex gap-2 items-center text-gray-500 text-xs' >{playlistData?.artistsNames}</span>
                <span className='flex gap-2 items-center text-gray-500 text-xs'>{`${Math.round(playlistData?.like/1000)}K người yêu thích`}</span>
           </div>
        </div> 
    <Scrollbars autoHide style={{ width: '100%', height: '80%' }}>
        <div className='flex-auto mb-40'>
            <span className='text-sm'>
                <span className='text-gray-600'>lời tựa </span>
                <span className='text-gray-700'>
                    {playlistData?.sortDescription}
                </span>
            </span>
                <ListSongs  totalDuration = {playlistData?.song?.totalDuration}/>
        </div>
    </Scrollbars>
    </div>
  )
}

export default Album