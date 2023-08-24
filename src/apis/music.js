import axios from '../axious'

export const getSong = (sid) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            url :'api/song',
            method :'get',
            params : {id : sid}
        })
        resolve(response)
        //resolve giống return 
    } catch (error) {
        reject(error)
        // reject error anh ý bảo là giống return nhưng dùng cho error
    }
})
export const getDetailSong = (sid) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            url :'api/infosong',
            method :'get',
            params : {id : sid}
        })
        resolve(response)
        //resolve giống return 
    } catch (error) {
        reject(error)
        // reject error anh ý bảo là giống return nhưng dùng cho error
    }
})
export const getDetailPlaylist = (pid) => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            url :'api/detailplaylist',
            method :'get',
            params : {id : pid}
        })
        resolve(response)
        //resolve giống return 
    } catch (error) {
        reject(error)
        // reject error anh ý bảo là giống return nhưng dùng cho error
    }
})