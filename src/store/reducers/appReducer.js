import actionTypes from "../actions/actionTypes";

const initState = {
    banner: [],
    artists : {},
    loveLife : {},
    top100 : {},
    liveRadio : {},
    hotAlbum : {},
    isLoading : false,
    newReleas : {},
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null,
                artists : action.homeData?.find(item => item.sectionId==="hArtistTheme") || {},
                loveLife : action.homeData?.find(item => item.sectionId==="hEditorTheme2") || {},
                top100 : action.homeData?.find(item => item.sectionId==="h100") || {},
                liveRadio : action.homeData?.find(item => item.sectionId==="hLiveRadio") || {},
                hotAlbum : action.homeData?.find(item => item.sectionId==="hAlbum") || {},
                newReleas : action.homeData?.find(item => item.sectionType==="new-release") || {},

                
            }
         case actionTypes.LOADING : {
            return {
                ...state,
                isLoading : action.flag
            }
         }   

        default:
            return state
    }
}

export default appReducer