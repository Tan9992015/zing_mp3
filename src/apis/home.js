import axios from '../axious'

export const getHome = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axios({
            url :'api/home',
            method :'get'
        })
        resolve(response)
        //resolve giống return 
    } catch (error) {
        reject(error)
        // reject error anh ý bảo là giống return nhưng dùng cho error
    }
})