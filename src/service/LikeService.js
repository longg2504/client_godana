import axios from "axios";
import API_URL_LIKE from '../constant/constantURL/URLLike';

class LikeService  {
    static createLike(data) {
        return  axios.post(API_URL_LIKE , data)
    }

    static deleteLike(data) {
       return axios.post(API_URL_LIKE + `/delete` , data) 
    }

    static async getAllLikeListByUser(userId) {
        return await axios.get(API_URL_LIKE +`/${userId}`)
    }
    
}   

export default LikeService;
