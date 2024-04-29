import axios from "axios";
import API_URL_RATING from "../constant/constantURL/URLRating";

class RatingService  {
    static getRatingListByPlaceId(placeId) {
        return axios.get(API_URL_RATING + `/${placeId}`);
    }

    static async createReview(data) {
        return await axios.post(API_URL_RATING, data,);
    }

}   

export default RatingService;
