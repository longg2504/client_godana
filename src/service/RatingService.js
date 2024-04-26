import axios from "axios";
import API_URL_RATING from "../constant/constantURL/URLRating";

class RatingService  {
    static getRatingListByPlaceId(placeId) {
        return axios.get(API_URL_RATING + `/${placeId}`)
    }


}   

export default RatingService;
