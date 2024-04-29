import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { usePlace } from "../../../../context/PlaceContext";

const SearchSidebar = () => {
 const {rating, district, ward, address ,setDistrict, setRating, setAddress, setWard} = usePlace();

  return (
    <div
      className="d-flex flex-column bg-light p-3"
      style={{ height: "390px", width: "250px", position: "sticky", top: "0" }}
    >
      <h3 className="mb-4" style={{ textAlign: "center" }}>
        Tìm kiếm
      </h3>

      <Form.Group className="mb-3" controlId="rating">
        <Form.Label>Rating:</Form.Label>
        <Form.Select value={rating} onChange={e => setRating(e.target.value)}>
          <option value="">Chọn rating</option>
          <option value="1">1</option>
          <option value="1.5">1.5</option>
          <option value="2">2</option>
          <option value="2.5">2.5</option>
          <option value="3">3</option>
          <option value="3.5">3.5</option>
          <option value="4">4</option>
          <option value="4.5">4.5</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="city">
        <Form.Label>Thành phố:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên thành phố"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="district">
        <Form.Label>Quận:</Form.Label>
        <Form.Control type="text" placeholder="Nhập tên quận" value={district} onChange={e => setDistrict(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="ward">
        <Form.Label>Huyện:</Form.Label>
        <Form.Control type="text" placeholder="Nhập tên huyện" value={ward} onChange={e => setWard(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="street">
        <Form.Label>Đường:</Form.Label>
        <Form.Control type="text" placeholder="Nhập tên đường" value={address} onChange={e => setAddress(e.target.value)}/>
      </Form.Group>

      {/* Bạn có thể giữ nút này nếu muốn cung cấp tùy chọn tìm kiếm bằng cách nhấp vào nút */}
      <Button className="btn-primary w-100">Tìm kiếm</Button>
    </div>
  );
};

export default SearchSidebar;
