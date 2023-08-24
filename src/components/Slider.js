import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as actions from '../store/actions'
import { useNavigate } from 'react-router-dom'
const Slider = () => {
    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        const sliderEls = document.getElementsByClassName('slider-item')
        let min = 0;
        let max = 2;
        const intervalId = setInterval(()=>{
            for(let i = 0;i<sliderEls.length;i++){
                if(i  < max && i >= min){
                    sliderEls[i].style.display ='block'
                }else {
                    sliderEls[i].style.display = 'none'
                }
            }
            min += 1
            max += 1
     
            if( max > 3 && min > 2){
                min = 0;
                max = 2;
            }
        },2000)
        return  () => (
            intervalId && clearInterval(intervalId)
        )
    },[])
    const handleClickBanner = (item)=>{
        if(item.type===1){
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))

            // cái này là liên quan đến atAlbum 
            dispatch(actions.setPlaylist(null))
        }else if(item.type===4){


            // console.log(item)
            const albumPath = item.link.split('.')[0]
            // console.log(albumPath)
            navigate(albumPath)
        }else {
            // cái này là liên quan đến atAlbum 
            dispatch(actions.setPlaylist(null))
        }
    }
  return (
    <div className='flex gap-8 w-full overflow-hidden px-[59px] pt-8'>
      {banner?.map(item=>(
        <img
        key={item.encodeId}
            src={item.banner}
            className='slider-item flex-1 object-contain w-1/2 rounded-lg'
            alt='hello'
            onClick={()=>handleClickBanner(item)}
        />
      ))}
    </div>
  )
}

export default Slider