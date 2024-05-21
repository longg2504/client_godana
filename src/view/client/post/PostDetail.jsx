import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  ListGroup,
  Image,
  DropdownButton,
  Dropdown,
  FormGroup,
} from "react-bootstrap";
import userImage from "../../../images/user.png";
import { formatDistanceToNow } from "date-fns";
import { FaThumbsUp, FaComment, FaPaperPlane } from "react-icons/fa";
import CommentService from "../../../service/CommentService";
import PostDetailSlider from "./PostDetailSlider";
import "./css/postDetail.css";
import PostService from "../../../service/PostService";

function PostDetail({
  post,
  show,
  handleClose,
  likedPosts,
  handleLikeClick,
  refreshPosts,
}) {
  const [comment, setComment] = useState("");
  const likedPostIds = Array.isArray(likedPosts)
    ? likedPosts.map((like) => like.post.id)
    : [];
  const isPostLiked = likedPostIds.includes(post ? post.id : -1);

  const [likeCount, setLikeCount] = useState(post ? post.like : 0);
  const [commentCount, setCommentCount] = useState(post ? post.comment : 0);
  const [isLiked, setIsLiked] = useState(isPostLiked);
  const [commentList, setCommentList] = useState([]);
  const [replies, setReplies] = useState({});
  const commentInputRef = useRef(null);
  const replyInputRef = useRef(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyValue, setReplyValue] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingReply, setEditingReply] = useState(null);
  const [editContent, setEditContent] = useState("");
  const userId = localStorage.getItem("id");
  const avatar = localStorage.getItem("avatar");

  useEffect(() => {
    const getAllCommentParentByPost = async () => {
      const res = await CommentService.getCommentParentByPostId(post.id);
      setCommentList(res.data);
    };
    getAllCommentParentByPost();
  }, [post.id]);

  const handleLike = (postId) => {
    handleLikeClick(postId);
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const submitComment = async () => {
    const data = {
      content: comment,
      postId: post.id,
      userId: userId,
    };

    try {
      await CommentService.createComment(data);
      setComment("");
      const res = await CommentService.getCommentParentByPostId(post.id);
      setCommentList(res.data);
      setCommentCount(commentCount + 1);
      refreshPosts();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const scrollToCommentInput = () => {
    commentInputRef.current.focus();
  };

  const handleReplyClick = async (commentId) => {
    if (!replies[commentId]) {
      const res = await CommentService.getAllReplyByCommentId(commentId);
      setReplies({ ...replies, [commentId]: res.data });
    }
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const submitReply = async (commentId) => {
    const data = {
      content: replyValue,
      postId: post.id,
      userId: userId,
    };

    try {
      await CommentService.createReply(commentId, data);
      setReplyValue("");
      const res = await CommentService.getAllReplyByCommentId(commentId);
      setReplies({ ...replies, [commentId]: res.data });
      refreshPosts();
      setCommentCount(post.comment);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await CommentService.deletedComment(commentId);
      const res = await CommentService.getCommentParentByPostId(post.id);
      const response = await PostService.getPostById(post.id);
      setCommentList(res.data);
      setCommentCount(response.data.comment);
      refreshPosts();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleEditComment = (comment) => {
    console.log(comment, "comment");
    setEditingComment(comment.commentId);
    setEditContent(comment.content);
  };

  const handleUpdateComment = async () => {
    try {
      await CommentService.updateComment(editingComment, {
        content: editContent,
      });
      const res = await CommentService.getCommentParentByPostId(post.id);
      setCommentList(res.data);
      setEditingComment(null);
      setEditContent("");
      refreshPosts();
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleEditReply = (reply) => {
    setEditingReply(reply.commentId);
    setEditContent(reply.content);
  };

  const handleUpdateReply = async (commentId) => {
    console.log("commentId" , commentId)
    try {
      await CommentService.updateComment(editingReply, { content: editContent });
      const res = await CommentService.getAllReplyByCommentId(commentId);
      setReplies({ ...replies, [commentId]: res.data });
      setEditingReply(null);
      setEditContent("");
      refreshPosts();
    } catch (error) {
      console.error("Error updating reply:", error);
    }
  };

  const handleDeleteReply = async (replyId, commentId) => {
    try {
      await CommentService.deletedComment(replyId);
      const res = await CommentService.getAllReplyByCommentId(commentId);
      setReplies({ ...replies, [commentId]: res.data });
      setCommentCount(commentCount - 1);
      refreshPosts();
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ marginLeft: "32%" }}>
          Bài viết của {post.user.username}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <img
              src={post.user.avatar?.fileUrl || userImage}
              alt="User Avatar"
              className="rounded-circle me-3"
              style={{ width: "40px", height: "40px" }}
            />
            <div>
              <h6 className="mb-0">{post.user.username || "User Name"}</h6>
              <p className="text-muted mb-0">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
        <h3 style={{ textAlign: "center" }}>{post.title}</h3>
        <p>{post.content}</p>
        <PostDetailSlider post={post} />
        <hr />
        <div className="d-flex align-items-center">
          <span className="me-2 text-muted">{likeCount}</span>
          <Button
            variant="button"
            className={`btn-action ${isLiked ? "liked" : ""}`}
            onClick={() => handleLike(post.id)}
          >
            <FaThumbsUp /> Like
          </Button>
          <span className="me-2 text-muted">{commentCount}</span>
          <Button
            variant="button"
            className="btn-action"
            onClick={scrollToCommentInput}
          >
            <FaComment /> Comment
          </Button>
        </div>
        <hr />
        <ListGroup variant="flush">
          {commentList &&
            commentList.map((comment, idx) => {
              const isOwner =
                comment.user && comment.user.id && userId
                  ? comment.user.id.toString() === userId.toString()
                  : false;
              return (
                <ListGroup.Item
                  key={comment.commentId}
                  style={{ border: "none !important" }}
                >
                  <div className="d-flex">
                    <Image
                      src={comment.user.avatar.fileUrl || userImage}
                      alt="Avatar"
                      roundedCircle
                      style={{ width: "30px", height: "30px" }}
                    />
                    <div className="ms-1 comment-item">
                      <strong>{comment.user.username}</strong>
                      {editingComment === comment.commentId ? (
                        <FormGroup style={{ position: "relative" }} >
                          <Form.Control
                            type="text"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            style={{ flexGrow: 1 , width :"500px"} }

                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleUpdateComment();
                              }
                            }}
                            // style={{ margin: "0 auto" }}
                          />
                          <Button
                            variant="link"
                            onClick={handleUpdateComment}
                            disabled={!editContent.trim()}
                            style={{
                              position: "absolute",
                              top: "0",
                              right: "0",
                              height: "38px",
                            }}
                          >
                            <FaPaperPlane color="blue" />
                          </Button>
                        </FormGroup>
                      ) : (
                        <p style={{ margin: "0 auto" }}>{comment.content}</p>
                      )}
                    </div>
                    {isOwner && (
                      <DropdownButton
                        id={`dropdown-comment-${idx}`}
                        variant=""
                        size="sm"
                        title=""
                        style={{ marginLeft: "10px" }}
                      >
                        <Dropdown.Item
                          onClick={() => handleEditComment(comment)}
                        >
                          Chỉnh sửa
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteComment(comment.commentId)}
                        >
                          Xoá
                        </Dropdown.Item>
                      </DropdownButton>
                    )}
                  </div>

                  <div style={{ marginLeft: "40px" }}>
                    <small className="text-muted">
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </small>

                    <small style={{ marginLeft: "10px" }}>
                      <Button
                        onClick={() => handleReplyClick(comment.commentId)}
                        variant="none"
                        style={{ fontSize: "12px", padding: "0" }}
                      >
                        Phản hồi
                      </Button>
                    </small>
                    <div
                      onClick={() => handleReplyClick(comment.commentId)}
                      style={{
                        fontSize: "14px",
                        cursor: "pointer",
                      }}
                    >
                      {replies[comment.commentId] &&
                      replies[comment.commentId].length > 0
                        ? replies[comment.commentId].length
                        : comment.countReply}{" "}
                      phản hồi
                    </div>
                  </div>
                  {replies[comment.commentId] &&
                    replyingTo === comment.commentId && (
                      <ListGroup variant="flush" style={{ marginLeft: "25px" }}>
                        {replies[comment.commentId].map((reply) => {
                          const isReplyOwner =
                            reply.user.id.toString() === userId.toString();
                          return (
                            <ListGroup.Item key={reply.commentId}>
                              <div className="d-flex">
                                <Image
                                  src={reply.user.avatar.fileUrl || userImage}
                                  alt="Avatar"
                                  roundedCircle
                                  style={{ width: "30px", height: "30px" }}
                                />
                                <div className="ms-1 comment-item">
                                  <strong>{reply.user.username}</strong>
                                  {editingReply === reply.commentId ? (
                                    <FormGroup style={{ position: "relative" }}>
                                      <Form.Control
                                        type="text"
                                        value={editContent}
                                        style={{ flexGrow: 1 , width :"500px"} }
                                        onChange={(e) =>
                                          setEditContent(e.target.value)
                                        }
                                        onKeyPress={(e) => {
                                          if (e.key === "Enter") {
                                            handleUpdateReply(comment.commentId);
                                          }
                                        }}
                                      />

                                      <Button
                                        variant="link"
                                        onClick={() => handleUpdateReply(comment.commentId)}
                                        disabled={!editContent.trim()}
                                        style={{
                                          position: "absolute",
                                          top: "0",
                                          right: "0",
                                          height: "38px",
                                        }}
                                      >
                                        <FaPaperPlane color="blue" />
                                      </Button>
                                    </FormGroup>
                                  ) : (
                                    <p style={{ margin: "0 auto" }}>
                                      {reply.content}
                                    </p>
                                  )}
                                </div>
                                {isReplyOwner && (
                                  <DropdownButton
                                    id={`dropdown-reply-${reply.replyId}`}
                                    variant=""
                                    size="sm"
                                    title=""
                                    style={{ marginLeft: "10px" }}
                                  >
                                    <Dropdown.Item
                                      onClick={() => handleEditReply(reply)}
                                    >
                                      Chỉnh sửa
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      onClick={() =>
                                        handleDeleteReply(
                                          reply.commentId,
                                          comment.commentId
                                        )
                                      }
                                    >
                                      Xoá
                                    </Dropdown.Item>
                                  </DropdownButton>
                                )}
                              </div>
                              <div style={{ marginLeft: "40px" }}>
                                <small className="text-muted">
                                  {formatDistanceToNow(
                                    new Date(reply.createdAt),
                                    {
                                      addSuffix: true,
                                    }
                                  )}
                                </small>
                              </div>
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    )}
                  {replyingTo === comment.commentId && (
                    <Form>
                      <Form.Group
                        className="mb-3 d-flex align-items-center"
                        controlId="replyInput"
                        style={{ position: "relative" }}
                      >
                        <Image
                          src={avatar || userImage}
                          alt="Avatar"
                          roundedCircle
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "20px",
                          }}
                        />
                        <Form.Control
                          type="text"
                          placeholder="Write a reply..."
                          value={replyValue}
                          onChange={(e) => setReplyValue(e.target.value)}
                          ref={replyInputRef}
                          onKeyPress={(e) => {
                            if (e.key === "Enter" && replyValue.trim()) {
                              e.preventDefault();
                              submitReply(comment.commentId);
                            }
                          }}
                          style={{ flexGrow: 1 }}
                        />
                        <Button
                          variant="link"
                          onClick={() => submitReply(comment.commentId)}
                          disabled={!replyValue.trim()}
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            height: "38px",
                          }}
                        >
                          <FaPaperPlane color="blue" />
                        </Button>
                      </Form.Group>
                    </Form>
                  )}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        <Form>
          <Form.Group
            className="mb-3 d-flex align-items-center"
            controlId="commentInput"
            style={{ position: "relative" }}
          >
            <Image
              src={avatar || userImage}
              alt="Avatar"
              roundedCircle
              style={{ width: "30px", height: "30px", marginRight: "20px" }}
            />
            <Form.Control
              type="text"
              placeholder="Write a comment..."
              value={comment}
              onChange={handleCommentChange}
              ref={commentInputRef}
              style={{ flexGrow: 1 }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && comment.trim()) {
                  e.preventDefault();
                  submitComment();
                }
              }}
            />
            <Button
              variant="link"
              onClick={submitComment}
              disabled={!comment.trim()}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                height: "38px",
              }}
            >
              <FaPaperPlane color="blue" />
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default PostDetail;
