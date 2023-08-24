import React from 'react'
import  {Section,Slider,NewReleas} from '../../components'
import { useSelector } from 'react-redux/es/hooks/useSelector'
const Home = () => {
  const {artists,loveLife,top100,liveRadio,hotAlbum} = useSelector(state => state.app)
  console.log(artists)
  return (
    <div className='overflow-y-auto'>
        <Slider/>
        <Section data={artists}/>
        <Section data={loveLife}/>
        <NewReleas />
        <Section data={top100}/>
        <Section data={liveRadio}/>
        <Section data={hotAlbum}/>

        <div className='w-full h-[500px]'>

        </div>
    </div>
  )
}

export default Home