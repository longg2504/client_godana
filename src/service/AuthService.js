import axios from "axios";
import API_URL_AUTH from "../constant/constantURL/URLAuth";

class AuthService  {
    static async login(data) {
        return await axios.post(API_URL_AUTH + `/login`, data)
    }

    static async register(data) {
        return await axios.post(API_URL_AUTH + `/registerUser` , data)
    }
    
}   

export default AuthService;
