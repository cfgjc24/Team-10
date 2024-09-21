import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

export default function WorkerMap({ newLocation, isClockIn }) {
  const [map, setMap] = useState(null);
  const markersRef = useRef({});
  const currentUserMarkerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newMap = L.map('map').setView([40.7128, -74.0060], 10); // display map around NYC
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
    if (map) {
      fetchLocations();
    }
  }, [map]);

  useEffect(() => {
    if (map && newLocation && isClockIn) {
      addMarker(newLocation, true);
    } else if (map && !isClockIn && currentUserMarkerRef.current) {
      map.removeLayer(currentUserMarkerRef.current);
      currentUserMarkerRef.current = null;
    }
  }, [map, newLocation, isClockIn]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/locations');
      const locations = response.data.locations;
      locations.forEach(location => addMarker(location, false));
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const addMarker = (location, isCurrentUser) => {
    if (map) {
      const customIcon = L.icon({
        iconUrl: './hospitalmarker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      if (isCurrentUser && currentUserMarkerRef.current) {
        map.removeLayer(currentUserMarkerRef.current);
      } else if (!isCurrentUser && markersRef.current[location.id]) {
        map.removeLayer(markersRef.current[location.id]);
      }

      const marker = L.marker([location.latitude, location.longitude], { icon: customIcon })
        .addTo(map)
        .bindPopup(`Location Type: ${location.location_type || 'Current User'}`);

      if (isCurrentUser) {
        currentUserMarkerRef.current = marker;
        map.setView([location.latitude, location.longitude], 13);
      } else {
        markersRef.current[location.id] = marker;
      }
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Map</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
    </div>
  );
}