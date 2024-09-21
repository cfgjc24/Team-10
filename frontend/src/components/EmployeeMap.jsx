import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeeMap() {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Get user's current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current && userLocation) {
      const newMap = L.map('map').setView([userLocation.latitude, userLocation.longitude], 13);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(newMap);

      mapRef.current = newMap;

      const customIcon = L.icon({
        iconUrl: '/img/marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      L.marker([userLocation.latitude, userLocation.longitude], { icon: customIcon })
        .addTo(newMap)
        .bindPopup("Your Location");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [userLocation]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Employee Map</h1>
      <div id="map" style={{ height: '500px', width: '90%' }}></div>
    </div>
  );
}