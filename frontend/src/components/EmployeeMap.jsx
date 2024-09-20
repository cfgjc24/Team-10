import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function EmployeeMap() {

  const [map, setMap] = useState(null);


  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newMap = L.map('map').setView([40.7128, -74.0060], 10); // display map around nyc

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(newMap); // this is the syle i went for (grey)
      setMap(newMap);

      return () => {
        newMap.remove();
      };
    }
  }, []);

    useEffect(() => {
    if (map) {
      //testing
      const employeeLocation = [40.6084, -73.9574];
      
      // creating a customized icon
      const customIcon = L.icon({
        iconUrl: './hospitalmarker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32] 
      });
      // now ima add the marker
      L.marker(employeeLocation, { icon: customIcon })
        .addTo(map)
        .bindPopup("Data")
    }
  }, [map]);


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Map</h1>
      <div id="map" style={{ height: '500px', width: '100%' }}></div>
          </div>
  );
}