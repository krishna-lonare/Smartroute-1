import { useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MapView from "../components/MapView";
import AlertBox from "../components/AlertBox";
import StatsCard from "../components/StatsCard";

import { getRoute } from "../services/routeService";
import { getWeather } from "../services/weatherService";
import { getCoordinates } from "../services/geocodeService";

function Dashboard() {
  const [routeData, setRouteData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [trafficLevel, setTrafficLevel] = useState(4);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleRoute(source, destination) {
    setLoading(true);
    setError(null);

    try {
      // ✅ Get coordinates
      const [start, end] = await Promise.all([
        getCoordinates(source),
        getCoordinates(destination),
      ]);

      console.log("START:", start);
      console.log("END:", end);

      // ✅ Validation
      if (!start || !end) {
        setError("Location not found. Try different places.");
        setLoading(false);
        return;
      }

      // ❗ Convert correctly for route API (lng, lat)
      const routeStart = { lng: start.lng, lat: start.lat };
      const routeEnd = { lng: end.lng, lat: end.lat };

      // ✅ Fetch weather + route in parallel
      const [weather, route] = await Promise.all([
        getWeather(source),
        getRoute(routeStart, routeEnd),
      ]);

      if (!route) {
        setError("Route not found between locations.");
        setLoading(false);
        return;
      }

      setWeatherData(weather);
      setRouteData(route);

      // optional traffic update
      if (route?.trafficLevel) {
        setTrafficLevel(route.trafficLevel);
      }

    } catch (err) {
      console.log(err);
      setError("Something went wrong while fetching route.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <Navbar weatherData={weatherData} />

      <div className="flex flex-col lg:flex-row">

        <Sidebar
          handleRoute={handleRoute}
          trafficLevel={trafficLevel}
          setTrafficLevel={setTrafficLevel}
          loading={loading}
        />

        <div className="flex-1 p-4 md:p-6 flex flex-col gap-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            <StatsCard
              title="Route Status"
              value={loading ? "Loading..." : "Active"}
              subtitle="Emergency routing enabled"
              color="text-green-400"
            />

            <StatsCard
              title="Traffic Level"
              value={`${trafficLevel}/10`}
              subtitle={
                trafficLevel > 7
                  ? "Heavy Traffic"
                  : "Smooth Route"
              }
              color="text-yellow-400"
            />

            <StatsCard
              title="Weather"
              value={
                weatherData
                  ? `${weatherData?.main?.temp}°C`
                  : "--"
              }
              subtitle={
                weatherData?.weather?.[0]?.main || "No Data"
              }
              color="text-cyan-400"
            />

          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <AlertBox
            weatherData={weatherData}
            trafficLevel={trafficLevel}
          />

          <MapView routeData={routeData} />

        </div>
        </div>
    </div>
  );
}

export default Dashboard;