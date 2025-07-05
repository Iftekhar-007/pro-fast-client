// import React from "react";

// const Coverage = () => {
//   return (
//     <div>
//       <h2>coverage</h2>
//     </div>
//   );
// };

// export default Coverage;

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { warehouses } from "../../../data/warehouses.json";
import "leaflet/dist/leaflet.css";
// import "./lib/leafletIconFix";

const Coverage = () => {
  // 🎯—center roughly Bangladesh; tweak zoom as you like
  const mapCenter = [23.8, 90]; // lat, lng

  return (
    <section className="w-full h-[90vh] p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary">
        Delivery Coverage Map
      </h1>

      <MapContainer
        center={mapCenter}
        zoom={7}
        scrollWheelZoom
        className="w-full h-full rounded-xl shadow-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org/copyright">OSM</a> contributors'
        />

        {warehouses.map((wh, idx) => (
          <Marker key={idx} position={[wh.latitude, wh.longitude]}>
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">
                  {wh.region} › {wh.district} › {wh.city}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Covered:</span>{" "}
                  {wh.covered_area.join(", ")}
                </p>
                <a
                  href={wh.flowchart}
                  target="_blank"
                  rel="noreferrer"
                  className="link link-primary text-sm"
                >
                  View flow‑chart ↗
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </section>
  );
};

export default Coverage;
