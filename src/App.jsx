import { useState, useEffect } from 'react';
import Map from './components/Map';
import { getUserLocation } from './services/geolocation';

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    getUserLocation()
    .then(setLocation)
    .catch((error) => console.error("Error obtenido ubicacion:",error));
  }, []);

  return (
    <div>
      <h1>Location in Map</h1>
      {location ? (
        <Map latitude={location.latitude} longitude={location.longitude} />
      ) : (
        <p>Loading Location...</p>
      )}
    </div>
  );
}

export default App