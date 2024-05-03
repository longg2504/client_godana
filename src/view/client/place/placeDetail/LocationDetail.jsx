import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const LocationDetail = ({ latitude, longitude }) => {

  const mapRef = useRef(null);

  var greenIcon = L.icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',

    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], 500);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy;&nbsp;&nbsp;<p>Dữ liệu bản đồ ©2023</p>&nbsp;&nbsp;<a href="https://www.openstreetmap.org/copyright"> Điều khoản sử dụng </a>&nbsp;&nbsp;<a href="https://www.openstreetmap.org/copyright"> Báo cáo một lỗi bản đồ </a>',
      }).addTo(mapRef.current);

      L.marker([latitude, longitude], { icon: L.divIcon({ className: 'custom-marker' }) }).addTo(mapRef.current);
    }
  }, [latitude, longitude]);

  return (
    <div id="map" style={{ height: '700px', width:'93%' }}></div>
  );
};

export default LocationDetail;