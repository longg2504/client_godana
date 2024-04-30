import axios from "axios";
import API_URL_FAVOURITE from '../constant/constantURL/URLFavourite';

class FavouriteService  {
    static getFavouriteListByUser(userId) {
        return axios.get(API_URL_FAVOURITE + `/${userId}`)
    }

    static async createFavouriteList(data){
        return await axios.post(API_URL_FAVOURITE, data)
    }

    static async deletedFavourite(data){
        return await axios.post(API_URL_FAVOURITE + `/delete` , data)
    }
}   

export default FavouriteService;
