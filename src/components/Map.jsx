import { useEffect, useRef } from "react";

const Map = ({ latitude, longitude }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const script = document.createElement("script");
        script.src = 'https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap';
        script.async = true;
        window.initMap = () => {
            new window.google.maps.Map(mapRef.current, {
                center: { lat: latitude, lng: longitude},
                zoom: 15,
            });
        };
        document.body.appendChild(script);
        return () => document.body.removeChild(script);
    }, [latitude, longitude]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px"}} />;
};

export default Map;