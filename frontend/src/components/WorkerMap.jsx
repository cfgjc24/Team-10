import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function WorkerMap({ newLocation, isClockIn }) {
  const [map, setMap] = useState(null);
  const employeeMarkerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newMap = L.map('map').setView([40.7128, -74.0060], 10);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(newMap);
      setMap(newMap);
      return () => {
        newMap.remove();
      };
    }
  }, []);

  useEffect(() => {
    console.log('WorkerMap: newLocation changed', newLocation);
    console.log('WorkerMap: isClockIn changed', isClockIn);

    if (map && newLocation) {
      console.log('WorkerMap: Updating marker');
      // Remove existing employee marker if it exists
      if (employeeMarkerRef.current) {
        map.removeLayer(employeeMarkerRef.current);
        employeeMarkerRef.current = null;
      }

      // Add new employee marker if clocked in and location exists
      if (isClockIn) {
        const customIcon = L.icon({
          iconUrl: '/img/marker.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32]
        });

        employeeMarkerRef.current = L.marker([newLocation.latitude, newLocation.longitude], { icon: customIcon })
          .addTo(map)
          .bindPopup('Your Location');

        map.setView([newLocation.latitude, newLocation.longitude], 13);
      }
    }
  }, [map, newLocation, isClockIn]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Map</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
      <div>
        <p>Is Clocked In: {isClockIn ? 'Yes' : 'No'}</p>
        <p>Location: {newLocation ? `Lat: ${newLocation.latitude}, Lon: ${newLocation.longitude}` : 'Not set'}</p>
      </div>
    </div>
  );
}