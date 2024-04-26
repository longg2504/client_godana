import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const ShowLocation = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy;&nbsp;&nbsp;<p>Dữ liệu bản đồ ©2023</p>&nbsp;&nbsp;<a href="https://www.openstreetmap.org/copyright"> Điều khoản sử dụng </a>&nbsp;&nbsp;<a href="https://www.openstreetmap.org/copyright"> Báo cáo một lỗi bản đồ </a>',
      }).addTo(mapRef.current);

      L.marker([latitude, longitude], { icon: L.divIcon({ className: 'custom-marker' }) }).addTo(mapRef.current);
    }
  }, [latitude, longitude]);

  return (
    <div id="map" style={{ height: '500px' }}></div>
  );
};

export default ShowLocation;