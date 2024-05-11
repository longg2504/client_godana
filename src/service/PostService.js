import axios from "axios";
import API_URL_POST from '../constant/constantURL/URLPost';

class PostService  {
    static async getAllPostByCategory(categoryId) {
        return await axios.get(API_URL_POST + `?category=${categoryId}`)
    }

    static async getPostById(postId){
        return await axios.get(API_URL_POST+ `/${postId}`)
    }

    static async createPost(data){
        return await axios.post(API_URL_POST, data)
    }

    static async updatePost(postId, data){
        return await axios.post(API_URL_POST + `/${postId}` , data)
    }
    
}   

export default PostService;
