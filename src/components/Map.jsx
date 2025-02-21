import { useEffect, useRef } from "react";

const Map = ({ locations }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const scriptId = "googleMapsScript";
        let script = document.getElementById(scriptId);
    
        if (!script) {
            script = document.createElement("script");
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
            script.async = true;
            document.body.appendChild(script);
    
            window.initMap = () => {
                const map = new window.google.maps.Map(mapRef.current, {
                    center: locations[0]
                        ? { lat: locations[0].latitude, lng: locations[0].longitude }
                        : { lat: 0, lng: 0 },
                    zoom: 10,
                });
    
                locations.forEach((location) => {
                    new window.google.maps.Marker({
                        position: { lat: location.latitude, lng: location.longitude },
                        map: map,
                        title: location.name,
                    });
                });
            };
        } else if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
            window.initMap();
        }
    
        return () => {
        };
    }, [locations]);

    return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default Map;