import axios from "axios";
import API_URL_COMMENT from '../constant/constantURL/URLComment';

class CommentService  {
    static async getCommentParentByPostId(postId) {
        return await axios.get(API_URL_COMMENT + `/${postId}`)
    }

    static async getAllReplyByCommentId(commentId) {
        return await axios.get(API_URL_COMMENT + `/get_all_reply/${commentId}`)
    }

    static async createComment(data){
        return await axios.post(API_URL_COMMENT , data)
    }

    static async createReply(commentId, data){
        return await axios.post(API_URL_COMMENT + `/${commentId}` , data)
    }

    static async deletedComment(commentId){
        return await axios.post(API_URL_COMMENT + `/deleted/${commentId}`)
    }

    static async updateComment(commentId, data){
        return await axios.post(API_URL_COMMENT + `/update/${commentId}` , data)
    }
}   

export default CommentService;
