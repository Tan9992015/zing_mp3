import actionTypes from "../actions/actionTypes";

const initState = {
   curSongId : null,
   isPlaying : false,
   atAlbum : false,
    // có state mới thì phải viết action và reducer để xử lý nó
    songs : null
    // nếu k ở trong playlist thì songs là null
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
           case actionTypes.SET_CUR_SONG_ID : 
           return {
            ...state,
            curSongId : action.sid || null
           }
           case actionTypes.PLAY :
            return {
                ...state,
                isPlaying : action.flag
            }
            case actionTypes.SET_ALBUM :
            return {
                ...state,
                atAlbum: action.flag
            }
            case actionTypes.PLAYLIST :
            return {
                ...state,
                songs: action.songs || null
            }
        default:
            return state
    }
}

export default musicReducer