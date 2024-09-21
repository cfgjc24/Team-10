import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const WorkerMap = ({ workerLocations }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const newMap = L.map('map').setView([40.7128, -74.0060], 10);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(newMap);
    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map && workerLocations) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });

      workerLocations.forEach((workerLocation) => {
        L.marker([workerLocation.latitude, workerLocation.longitude])
          .addTo(map)
      });


      if (workerLocations.length > 0) {
        const firstLocation = workerLocations[0];
        map.setView([firstLocation.latitude, firstLocation.longitude], 13);
      }
    }
  }, [map, workerLocations]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Worker Map</h1>
      <div id="map" style={{ height: '500px', width: '100%', marginBottom: '1rem' }}></div>
    </div>
  );
};

const EmployeePage = () => {
  const [openCaseCount] = useState(100);
  const workerLocations = [
    { name: "Alice Johnson", latitude: 40.7128, longitude: -74.0060 },
    { name: "Bob Smith", latitude: 40.7306, longitude: -73.9352 },
    { name: "Charlie Brown", latitude: 40.6501, longitude: -73.9496 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 text-white bg-blue-600 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Lonestar Children's Services</h1>
          <p className="mt-2 text-xl">Our impact: {openCaseCount} open cases!</p>
        </div>
      </header>

      <main className="container mx-auto mt-8">
        <WorkerMap workerLocations={workerLocations} />
      </main>
    </div>
  );
};

export default EmployeePage;
