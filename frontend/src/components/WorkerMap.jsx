import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function SimpleMap() {

  const locations = [
  { latitude: 40.7128, longitude: -74.0060, label: "New York" }
];

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/User/Locations/all');
      console.log('Fetched locations:', response.data.locations);  // Log the data
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  useEffect(() => {
    fetchLocations();

    const map = L.map('map').setView([40.7128, -74.0060], 10); // 

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

        locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup(`<b>${location.label}</b>`);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Map</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
}
