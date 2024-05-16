import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import PostService from "../../../service/PostService";
import UseFetchCategory from "../../../hooks/client/UseFetchCategory";

const PostUpdate = ({ post, refreshPosts, onClose }) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [selectedCategory, setSelectedCategory] = useState(
    post ? post.category.id : ""
  );
  const [currentImageIds, setCurrentImageIds] = useState(
    post ? post.postAvatar.map((img) => img.id) : []
  );
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const categories = UseFetchCategory();
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setSelectedCategory(post.category.id);
      const existingImagePreviews = post.postAvatar
        ? post.postAvatar.map((img) => img.fileUrl)
        : [];
      setImagePreviews(existingImagePreviews);
      setCurrentImageIds(post.postAvatar.map((img) => img.id));
    }
  }, [post]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImagesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newFiles]); // Append new images to the existing list
    setImagePreviews([...imagePreviews, ...newPreviews]); // Append new image previews
  };

  const handleDeleteImage = (index) => {
    setCurrentImageIds(currentImageIds.filter((_, i) => i !== index));
    const previewUrl = imagePreviews[index];
    URL.revokeObjectURL(previewUrl);
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index)); // Also remove from images state
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsSaveLoading(true);

    const formData = new FormData();
    formData.append("postTitle", title);
    formData.append("content", content);
    formData.append("categoryId", selectedCategory);
    currentImageIds.forEach((id) =>
      formData.append("listIdAvatarCurrrent", id)
    );

    // Only add images to formData if there are new images

    images.forEach((image) => formData.append("images", image));

    try {
      await PostService.updatePost(post.id, formData);
      refreshPosts();
      onClose();
    } catch (error) {
      console.error("Error updating post:", error);
    }
    finally{
      setIsSaveLoading(false);  
    }
  };

  return (
    <Modal show={post} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa bài viết</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tiêu đề:</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={content}
              onChange={handleContentChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Danh mục:</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Chọn danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <label htmlFor="image-upload-update" className="btn btn-light">
              <FaPlus /> Thêm ảnh
            </label>
            <input
              type="file"
              id="image-upload-update"
              multiple
              onChange={handleImagesChange}
              style={{ display: "none" }}
            />
          </Form.Group>
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
                  src={src}
                  alt={`Image ${index}`}
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
              style={{ marginLeft: "30%", marginTop: "20px" }}
            >
              Cập nhật bài viết
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PostUpdate;
