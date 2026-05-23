import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  ZoomControl,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function MapView({
  routeData,
  trafficLevel,
}) {

  // Default Center
  const position = [18.5204, 73.8567];

  // Convert Route Coordinates
  const routeCoordinates =
    routeData?.features?.[0]?.geometry?.coordinates?.map(
      (coord) => [coord[1], coord[0]]
    ) || [];

  // Route Color Logic
  const routeColor =
    trafficLevel > 7
      ? "#ef4444"
      : trafficLevel > 4
      ? "#eab308"
      : "#22c55e";

  // Fake Traffic Zone
  const trafficZone = [18.525, 73.865];

  return (
    <div className="relative h-[400px] md:h-[550px] lg:h-[680px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white">

      {/* Live Status */}
      <div className="absolute top-4 left-4 z-[1000] bg-black/70 backdrop-blur-lg border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">

        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />

        <div>
          <p className="text-xs text-gray-400">
            Emergency System
          </p>

          <h3 className="text-sm font-semibold text-white">
            Live Tracking Active
          </h3>
        </div>

      </div>

      

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
      >

        {/* LIGHT MAP THEME (FIXED) */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />

        {/* Marker */}
        <Marker position={position}>
          <Popup>
            Emergency Location
          </Popup>
        </Marker>

        {/* Traffic Zone */}
        {trafficLevel > 6 && (
          <Circle
            center={trafficZone}
            radius={350}
            pathOptions={{
              color: "#ef4444",
              fillColor: "#ef4444",
              fillOpacity: 0.25,
            }}
          />
        )}

        {/* Route */}
        {routeCoordinates.length > 0 && (
          <Polyline
            key={trafficLevel}
            positions={routeCoordinates}
            pathOptions={{
              color: routeColor,
              weight: 7,
              opacity: 0.9,
            }}
          />
        )}

      </MapContainer>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />

    </div>
  );
}

export default MapView;