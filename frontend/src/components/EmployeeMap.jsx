import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeeMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const newMap = L.map('map').setView([40.7128, -74.0060], 10);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(newMap);

      mapRef.current = newMap;

      const employeeLocations = [
        [40.6084, -73.9574],
        [40.7128, -74.0060],
        [34.0522, -118.2437],
      ];

      const customIcon = L.icon({
        iconUrl: '/img/marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      employeeLocations.forEach((location) => {
        L.marker(location, { icon: customIcon })
          .addTo(newMap)
          .bindPopup("Employee Data");
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Employee Map</h1>
      <div id="map" style={{ height: '500px', width: '90%' }}></div>
    </div>
  );
}