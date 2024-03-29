import actionTypes from "./actionTypes";
import * as apis from '../../apis'
export const setCurSongId = (sid) => (
    {
        type : actionTypes.SET_CUR_SONG_ID,
        sid
    }
   
)
export const play = (flag) => (
    {
        type : actionTypes.PLAY,
        flag
    }
    
)

export const playAlbum = (flag) => (
    {
        type : actionTypes.SET_ALBUM,
        flag
    }
    
)
export const setPlaylist = (songs) => (
    {
        type : actionTypes.PLAYLIST,
        songs
    }
    
)
export const loading = (flag) => (
    {
        type : actionTypes.LOADING,
        flag
    }
    
)
// export   const apifetchDetailPlaylist =(pid)=> async(dispatch)=>{
//     // 1 hàm return ra 1 hàm nữa tham số của hàm đó là dispatch (cái này redux thunk middlewwhare )
//     // cái được dispatch là pid
//    try {
//     const response = await apis.getDetailPlaylist(pid)
//     // console.log(response)
//     if(response.data.err===0){
//         dispatch({
//             type : actionTypes.PLAYLIST,
//             songs : response?.data?.data?.items
//         })
//     }
//    } catch (error) {
//     dispatch({
//         type : actionTypes.PLAYLIST,
//         songs : null
//     })
//    }
// }