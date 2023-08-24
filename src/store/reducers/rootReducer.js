import appReducer from "./appReducer";
import musicReducer from "./musicReducer";
import { combineReducers} from "redux";
import {  persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// common dùng cho nhiều reducer
const commonConfig = {
    storage : storage,
    stateReconciler : autoMergeLevel2
}
const musicConfig = {
    ...commonConfig,
    key : 'music',
    whitelist : ['curSongId']
    // lưu thằng nào cần lưu trong white list nếu k thì nó sẽ lư hết trong local
}

const rootReducer = combineReducers({
    app:appReducer,
    music:persistReducer(musicConfig,musicReducer),
})
export default rootReducer
  