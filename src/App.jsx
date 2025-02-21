import { useState, useEffect } from 'react';
import Map from './components/Map';
import { getUserLocation } from './services/geolocation';

function App() {
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [newLocation, setNewLocation] = useState({
        name: '',
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        if (userLocation) {
            setLocations([
                {
                    name: "Your Location",
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                },
                ...locations,
            ]);
        }
    }, [userLocation]);

    const handleGetUserLocation = () => {
        getUserLocation()
            .then(setUserLocation)
            .catch((error) => console.error("Error obtaining location:", error));
    };

    const handleInputChange = (e) => {
        setNewLocation({ ...newLocation, [e.target.name]: e.target.value });
    };

    const handleAddLocation = (e) => {
        e.preventDefault();
        const { name, latitude, longitude } = newLocation;
        if (name && latitude && longitude) {
            setLocations([
                ...locations,
                {
                    name: name,
                    latitude: parseFloat(latitude),
                    longitude: parseFloat(longitude),
                },
            ]);
            setNewLocation({ name: '', latitude: '', longitude: '' });
        }
    };

    return (
        <div>
            <h1>Location Map</h1>
            <button onClick={handleGetUserLocation}>Get My Location</button>

            <form onSubmit={handleAddLocation}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newLocation.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="latitude"
                    placeholder="Latitude"
                    value={newLocation.latitude}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="longitude"
                    placeholder="Longitude"
                    value={newLocation.longitude}
                    onChange={handleInputChange}
                />
                <button type="submit">Add Location</button>
            </form>

            {locations.length > 0 ? (
                <Map locations={locations} />
            ) : (
                <p>No locations to display.</p>
            )}
        </div>
    );
}

export default App;