import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./leaflet.css";
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "leaflet/dist/images/marker-icon.png",
  shadowUrl: "leaflet/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


//TODO: Resolve missing png icons in the leaflet css
const LocationMap = () => {
  const position: [number, number] = [34.0906, -118.2918]; // Santa Monica Blvd & Vermont Ave

  return (
    <div className="z-1" style={{ height: "40vh", width: "40vw" }}>
      <MapContainer center={position} zoom={15} style={{ zIndex: 1, height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={defaultIcon}>
          <Popup>Santa Monica Blvd & Vermont Ave</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LocationMap;
