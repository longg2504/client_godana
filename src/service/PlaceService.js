import axios from "axios";
import API_URL_PLACE from '../constant/constantURL/URLPlace';

class PlaceService  {
    static getPlaceList() {
        return axios.get(API_URL_PLACE)
    }
    static getPlaceListByCategoryAndSearch(categoryId,search,district,ward,address,rating) {
        return axios.get(API_URL_PLACE + `?category=${categoryId}&search=${search}&districtName=${district}&wardName=${ward}&address=${address}&rating=${rating}`)
    }
    static getPlaceDetailById(placeId){
        return axios.get(API_URL_PLACE + `/${placeId}`)
    }

}   

export default PlaceService;
