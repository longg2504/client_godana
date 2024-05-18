import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { usePlace } from "../../../../context/PlaceContext";
import axios from 'axios';

const SearchSidebar = () => {
  const { rating, district, ward, address, setDistrict, setRating, setAddress, setWard } = usePlace();
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/48`);
        setDistricts(response.data.results);
      } catch (error) {
        console.error('Failed to fetch districts:', error);
      }
    };
    fetchDistricts();
  }, []);

  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${selectedDistrict}`);
          setWards(response.data.results);
        } catch (error) {
          console.error('Failed to fetch wards:', error);
        }
      } else {
        // Clear wards if no district is selected
        setWards([]);
        setSelectedWard('');
        setWard('');
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  const handleDistrictChange = (event) => {
    const { value } = event.target;
    if (value === '') {
      setSelectedDistrict('');
      setDistrict('');
      setWards([]);
      setSelectedWard('');
      setWard('');
    } else {
      const [id, name] = value.split('|');
      setSelectedDistrict(id);
      setDistrict(name);
    }
  };

  const handleWardChange = (event) => {
    const { value } = event.target;
    if (value === '') {
      setSelectedWard('');
      setWard('');
    } else {
      const [id, name] = value.split('|');
      setSelectedWard(id);
      setWard(name);
    }
  };

  return (
    <div className="d-flex flex-column bg-light p-3" style={{ height: "550px", width: "250px", position: "sticky", top: "0" }}>
      <h3 className="mb-4" style={{ textAlign: "center" }}>Tìm kiếm</h3>

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
          placeholder="Thành phố Đà Nẵng"
          readOnly
          value="Đà Nẵng"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="district">
        <Form.Label>Quận:</Form.Label>
        <Form.Select value={selectedDistrict ? `${selectedDistrict}|${districts.find(d => d.district_id === selectedDistrict)?.district_name}` : ''} onChange={handleDistrictChange}>
          <option value="">Chọn Quận</option>
          {districts.map(d => (
            <option key={d.district_id} value={`${d.district_id}|${d.district_name}`}>{d.district_name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="ward">
        <Form.Label>Huyện:</Form.Label>
        <Form.Select value={selectedWard ? `${selectedWard}|${wards.find(w => w.ward_id === selectedWard)?.ward_name}` : ''} onChange={handleWardChange}>
          <option value="">Chọn Huyện</option>
          {wards.map(w => (
            <option key={w.ward_id} value={`${w.ward_id}|${w.ward_name}`}>{w.ward_name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="street">
        <Form.Label>Đường:</Form.Label>
        <Form.Control type="text" placeholder="Nhập tên đường" value={address} onChange={e => setAddress(e.target.value)}/>
      </Form.Group>
    </div>
  );
};

export default SearchSidebar;
