import axios from "axios";
import API_URL_USER from '../constant/constantURL/URLUser';


class UserService {
    static async updateUser(userId, data) {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        return await axios.post(API_URL_USER + `/update-user/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default UserService;
