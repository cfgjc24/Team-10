import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const locations = [
  { latitude: 40.7128, longitude: -74.0060, label: "New York" },
];

export default function SimpleMap() {
  useEffect(() => {
    // Create the map instance
    const map = L.map('map').setView([40.7128, -74.0060], 10); 

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);

    locations.forEach(location => {
      const marker = L.marker([location.latitude, location.longitude])
        .addTo(map)
        .bindPopup(`<b>${location.label}</b>`);
    });

    // Cleanup when component is unmounted
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
