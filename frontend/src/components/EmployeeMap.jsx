import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeeMap({ newLocation, isClockIn }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (isClockIn && newLocation) {
      // Only show the map if the user is clocked in and has a valid location
      const { latitude, longitude } = newLocation;

      if (!mapRef.current) {
        const newMap = L.map('map').setView([latitude, longitude], 13);
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

        L.marker([latitude, longitude], { icon: customIcon })
          .addTo(newMap)
          .bindPopup("Your Location");
      }
    } else {
      // If the user is clocked out, clear the map
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isClockIn, newLocation]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Employee Map</h1>
      {isClockIn && newLocation ? (
        <div id="map" style={{ height: '500px', width: '90%' }}></div>
      ) : (
        <p>Please clock in to view your location on the map.</p>
      )}
    </div>
  );
}
