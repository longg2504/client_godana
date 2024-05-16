import React, { useState } from "react";
import { Container, Row, Card, Button, Form, Modal } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import Swal from "sweetalert";
import PostService from "../../../service/PostService";
import userImage from "../../../images/user.png";
import UseFetchCategory from "../../../hooks/client/UseFetchCategory";

export default function PostCreation({ refreshPosts }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState(""); // Trạng thái lưu tiêu đề của bài viết
  const [postContent, setPostContent] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); // Trạng thái cho URL tạm của ảnh đã chọn
  const [selectedCategory, setSelectedCategory] = useState(""); // Trạng thái lưu danh mục đã chọn
  const jwt = localStorage.getItem("jwt");
  const userId = localStorage.getItem("id");
  const avatar = localStorage.getItem("avatar");
  const name = localStorage.getItem("name");
  const nameParts = name.split(" ");
  const lastName = nameParts[nameParts.length - 1];
  const categories = UseFetchCategory(); // Lấy danh sách danh mục từ hook
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  // Xử lý thay đổi nội dung bài viết
  const handlePostContentChange = (e) => {
    setPostContent(e.target.value);
  };

  // Xử lý thay đổi tiêu đề đã nhập
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Xử lý thay đổi danh mục đã chọn
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Xử lý thay đổi ảnh đã chọn
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // Thêm các ảnh mới vào mảng hiện tại
    const newImages = [...images, ...files];
    setImages(newImages);

    // Tạo URL tạm cho mỗi ảnh đã chọn
    const newImagePreviews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(newImagePreviews);
  };

  // Xử lý khi gửi bài viết
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaveLoading(true);
    if (!jwt) {
      Swal({
        title: "Thông báo!",
        text: "Vui lòng đăng nhập để thực hiện tính năng này",
        icon: "error",
        timer: 1000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("postTitle", title); // Thêm tiêu đề đã nhập vào form dữ liệu
    formData.append("content", postContent);
    formData.append("userId", userId);
    formData.append("categoryId", selectedCategory); // Thêm danh mục đã chọn vào form dữ liệu

    // Thêm các ảnh vào formData
    images.forEach((image) => {
      formData.append(`images`, image);
    });

    try {
      const res = await PostService.createPost(formData);
      if (res.status === 200) {
        setTitle(""); // Xóa tiêu đề sau khi gửi bài viết
        setPostContent("");
        setImages([]);
        setImagePreviews([]); // Xóa các URL tạm sau khi gửi bài viết
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
    }finally{
      setIsSaveLoading(false); 
    }
  };

  // Xử lý hiển thị form đăng bài viết
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Đóng form đăng bài viết
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Xử lý xóa ảnh khỏi mảng
  const handleDeleteImage = (index) => {
    // Loại bỏ ảnh tại vị trí chỉ định
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    // Loại bỏ URL tạm của ảnh tương ứng
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

      {/* Popup form đăng bài */}
      <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Trường nhập tiêu đề */}
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
            />

            {/* Thêm trường chọn danh mục */}
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

            {/* Hiển thị ảnh đã chọn */}
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
                  {/* Nút xóa ảnh */}
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
