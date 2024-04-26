import axios from "axios";
import API_URL_CATEGORY from '../constant/constantURL/URLCategory';

class CategoryService  {
    static getCategoryList() {
        return axios.get(API_URL_CATEGORY)
    }
}   

export default CategoryService;
