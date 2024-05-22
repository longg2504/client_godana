import React, { useState } from "react";
import { Container, Row, Card, Button, Form, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert";
import PostService from "../../../service/PostService";
import userImage from "../../../images/user.png";
import UseFetchCategory from "../../../hooks/client/UseFetchCategory";

const MAX_CONTENT_LENGTH = 500;

export default function PostCreation({ refreshPosts }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const jwt = localStorage.getItem("jwt");
  const userId = localStorage.getItem("id");
  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");
  const nameParts = name.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  const categories = UseFetchCategory();
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const handlePostContentChange = (e) => {
    if (e.target.value.length <= MAX_CONTENT_LENGTH) {
      setPostContent(e.target.value);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images, ...files];
    setImages(newImages);
    const newImagePreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(newImagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jwt) {
      Swal({
        title: "Thông báo!",
        text: "Vui lòng đăng nhập để thực hiện tính năng này",
        icon: "error",
        timer: 1000,
      });
      return;
    }

    if (!title || !postContent) {
      Swal({
        title: "Thông báo!",
        text: "Tiêu đề và nội dung bài viết không được để trống",
        icon: "error",
        timer: 1000,
      });
      return;
    }

    if (postContent.length > MAX_CONTENT_LENGTH) {
      Swal({
        title: "Thông báo!",
        text: "Nội dung bài viết không được quá 500 ký tự",
        icon: "error",
        timer: 1000,
      });
      return;
    }

    setIsSaveLoading(true);

    const formData = new FormData();
    formData.append("postTitle", title);
    formData.append("content", postContent);
    formData.append("userId", userId);
    formData.append("categoryId", selectedCategory);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await PostService.createPost(formData);
      if (res.status === 200) {
        setTitle("");
        setPostContent("");
        setImages([]);
        setImagePreviews([]);
        Swal({
          title: "Thành công!",
          text: "Bài viết đã được đăng thành công!",
          icon: "success",
          timer: 1000,
        });
        refreshPosts();
        setShowForm(false);
      }
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
    } finally {
      setIsSaveLoading(false);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleDeleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newImagePreviews = [...imagePreviews];
    newImagePreviews.splice(index, 1);
    setImagePreviews(newImagePreviews);
  };

  return (
    <Container>
      <Row className="justify-content-center my-3">
        <Card style={{ width: "600px" }}>
          <Card.Body>
            <div className="d-flex">
              <img
                src={avatar ? avatar : userImage}
                alt="User Avatar"
                className="rounded-circle me-3"
                style={{ width: "40px", height: "40px" }}
              />
              <Button
                variant="light"
                style={{ flex: 1, textAlign: "left" }}
                onClick={handleShowForm}
              >
                {lastName}, bạn đang nghĩ gì?
              </Button>
              <Button variant="light" className="ms-2" onClick={handleShowForm}>
                <FaPlus /> Thêm ảnh
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Row>

      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="text"
              placeholder="Nhập tiêu đề bài viết"
              value={title}
              onChange={handleTitleChange}
              className="mb-2"
            />

            <Form.Control
              as="textarea"
              placeholder="Bạn đang nghĩ gì?"
              rows={2}
              value={postContent}
              onChange={handlePostContentChange}
              className="mb-2"
              maxLength={MAX_CONTENT_LENGTH}
            />
            <div className="text-end">
              {postContent.length}/{MAX_CONTENT_LENGTH}
            </div>

            <Form.Group controlId="formCategory" className="mb-2">
              <Form.Label>Danh mục:</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <label htmlFor="image-upload-create" className="btn btn-light">
                  <FaPlus /> Thêm ảnh
                </label>
                <input
                  type="file"
                  id="image-upload-create"
                  multiple
                  onChange={handleImagesChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <div>
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: "10px",
                  }}
                >
                  <img
                    key={index}
                    src={src}
                    alt={`Preview ${index}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <Button
                    variant="danger"
                    size="sm"
                    style={{ position: "absolute", top: "0", right: "0" }}
                    onClick={() => handleDeleteImage(index)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </div>
            {isSaveLoading ? (
              <div className="loadingio-spinner-ellipsis-ilx1jirdsl" style={{ marginLeft: "170px", marginTop: "20px" }}>
                <div className="ldio-qk6putkpoq">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <Button
                type="submit"
                variant="primary"
                style={{ marginLeft: "170px", marginTop: "20px" }}
              >
                Đăng bài viết
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
