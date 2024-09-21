import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function WorkerMap({ workerLocation }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const newMap = L.map('map').setView([40.7128, -74.0060], 10);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(newMap);
    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map && workerLocation) {
      // Clear existing markers
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      L.marker([workerLocation.latitude, workerLocation.longitude])
        .addTo(map)
        .bindPopup("Your current location")
        .openPopup();

      map.setView([workerLocation.latitude, workerLocation.longitude], 13);
    }
  }, [map, workerLocation]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Worker Map</h1>
      <div id="map" style={{ height: '500px', width: '100%', marginBottom: '1rem' }}></div>
    </div>
  );
}