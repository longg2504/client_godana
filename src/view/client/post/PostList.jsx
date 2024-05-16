import React, { useState, useEffect } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import { FaThumbsUp, FaComment } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import userImage from "../../../images/user.png";
import "./css/post.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert";
import LikeService from "../../../service/LikeService";
import PostCreation from "./PostCreate";
import PostSlider from "./PostSlider";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import PostService from "../../../service/PostService";
import PostUpdate from "./PostUpdate";
import PostDetail from "./PostDetail";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  const jwt = localStorage.getItem("jwt");

  // Đầu tiên, thêm trạng thái để quản lý trạng thái của popup chỉnh sửa
  const [showEditPopup, setShowEditPopup] = useState(false);

  // Thêm trạng thái để lưu trữ bài viết được chọn để chỉnh sửa
  const [postToEdit, setPostToEdit] = useState(null);

  // Xử lý khi người dùng nhấp vào nút chỉnh sửa
  const handleEditPost = (post) => {
    setPostToEdit(post);
    setShowEditPopup(true);
  };

  // Xử lý khi đóng popup chỉnh sửa
  const handleCloseEditPopup = () => {
    setShowEditPopup(false); // Đóng popup
    setPostToEdit(null); // Xóa bài viết được chọn
  };

  useEffect(() => {
    const getAllPostByCategory = async () => {
      try {
        const res = await PostService.getAllPostByCategory(categoryId);
        setPosts(res.data.content);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getAllPostByCategory();
  }, [categoryId]);

  const refreshPosts = async () => {
    try {
      const res = await PostService.getAllPostByCategory(categoryId);
      setPosts(res.data.content);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
    }
  };

  useEffect(() => {
    refreshPosts();
  }, []);

  const getAllLikeListByUser = async () => {
    if (userId) {
      try {
        const res = await LikeService.getAllLikeListByUser(userId);
        setLikedPosts(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách like:", err);
      }
    } else {
      console.error("Id user không tồn tại");
    }
  };

  useEffect(() => {
    getAllLikeListByUser();
  }, [userId]);

  const handleShowDetail = (post) => {
    setSelectedPost(post);
    setShowDetail(true);
  };

  const handleClose = () => {
    setShowDetail(false);
    setSelectedPost(null);
  };

  const handleLikeClick = async (postId) => {
    if (!jwt) {
      Swal({
        title: "Thông báo!",
        text: "Vui lòng đăng nhập để thực hiện tính năng này",
        icon: "error",
        timer: 1000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
      return;
    }

    const isPostLiked = Array.isArray(likedPosts)
      ? likedPosts.some((like) => like.post.id === postId)
      : false;

    if (isPostLiked) {
      try {
        const deleteData = {
          postId: postId,
          userId: userId,
        };
        await LikeService.deleteLike(deleteData);

        setLikedPosts(likedPosts.filter((like) => like.post.id !== postId));

        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                like: post.like - 1,
              };
            }
            return post;
          })
        );
      } catch (error) {
        console.error("Lỗi khi bỏ like cho bài viết:", error);
      }
    } else {
      try {
        const createData = {
          postId: postId,
          userId: userId,
        };
        await LikeService.createLike(createData);

        setLikedPosts([...likedPosts, { post: { id: postId } }]);

        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              return {
                ...post,
                like: post.like + 1,
              };
            }
            return post;
          })
        );
      } catch (error) {
        console.error("Lỗi khi tạo 'like' cho bài viết:", error);
      }
    }
  };
  const handleDeletePost = async (postId) => {
    try {
      await PostService.deletePost(postId, jwt);

      // Cập nhật danh sách bài viết sau khi xóa
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
    }
  };

  return (
    <div>
      <Container className="my-3">
        {userId && <PostCreation refreshPosts={refreshPosts} />}
        <Row className="justify-content-center">
          {posts.length > 0 ? (
            posts.map((post, index) => {
              const likedPostIds = Array.isArray(likedPosts)
                ? likedPosts.map((like) => like.post.id)
                : [];
              const isPostLiked = likedPostIds.includes(post.id);
              const isOwner =
                post.user && post.user.id && userId
                  ? post.user.id.toString() === userId.toString()
                  : false;
              return (
                <Row key={index} className="justify-content-center">
                  <Card className="mb-4 mx-auto" style={{ width: "600px" }}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center">
                          <img
                            src={post.user.avatar?.fileUrl || userImage}
                            alt="User Avatar"
                            className="rounded-circle me-3"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <div>
                            <h6 className="mb-0">
                              {post.user.username || "User Name"}
                            </h6>
                            <p className="text-muted mb-0">
                              {formatDistanceToNow(new Date(post.createdAt), {
                                addSuffix: true,
                              })}
                            </p>
                          </div>
                        </div>

                        {isOwner && (
                          <DropdownButton
                            id={`dropdown-${index}`}
                            variant="light"
                          >
                            <Dropdown.Item onClick={() => handleEditPost(post)}>
                              Chỉnh sửa
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={() => handleDeletePost(post.id)}
                            >
                              Xóa
                            </Dropdown.Item>
                          </DropdownButton>
                        )}
                      </div>
                      <h3 style={{ textAlign: "center" }}>{post.title}</h3>
                      <p>{post.content}</p>
                      <PostSlider
                        post={post}
                        handleShowDetail={handleShowDetail}
                      />

                      <div className="d-flex align-items-center">
                        <span className="me-2 text-muted">{post.like}</span>
                        <Button
                          variant="button"
                          className={`btn-action ${isPostLiked ? "liked" : ""}`}
                          onClick={() => handleLikeClick(post.id)}
                        >
                          <FaThumbsUp /> Like
                        </Button>

                        <span className="me-2 text-muted">{post.comment}</span>

                        <Button
                          variant="button"
                          className="btn-action"
                          onClick={() => handleShowDetail(post)}
                        >
                          <FaComment /> Comment
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Row>
              );
            })
          ) : (
            <Col md={12}>
              <p>Không có bài viết nào</p>
            </Col>
          )}
        </Row>
      </Container>
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          show={showDetail}
          handleClose={handleClose}
          handleLikeClick={handleLikeClick}
          likedPosts={likedPosts}
          refreshPosts={refreshPosts}
        />
      )}

      {showEditPopup && postToEdit && (
        <PostUpdate
          post={postToEdit}
          refreshPosts={refreshPosts}
          onClose={handleCloseEditPopup}
        />
      )}
    </div>
  );
};

export default PostList;
