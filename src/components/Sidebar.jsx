import { useState } from "react";

function Sidebar({
  handleRoute,
  trafficLevel,
  setTrafficLevel,
  onBlockChange,
}) {

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [blocked, setBlocked] = useState(false);

  // Traffic Simulation
  function simulateTraffic() {
    const randomTraffic = Math.floor(Math.random() * 10) + 1;
    setTrafficLevel(randomTraffic);
  }

  // Block Road
  function handleBlockRoad() {
    const newBlocked = !blocked;
    setBlocked(newBlocked);

    setTrafficLevel(newBlocked ? 9 : 4);

    // Notify parent so it can trigger reroute or other actions
    if (typeof onBlockChange === "function") {
      onBlockChange(newBlocked);
    }
  }

  // Find Route
  function handleFindRoute() {
    if (!source || !destination) {
      alert("Please enter source and destination");
      return;
    }

    handleRoute(source, destination);
  }

  return (
    <div className="
      w-full lg:w-80
      h-full
      bg-gray-950/60
      backdrop-blur-xl
      border-r border-white/10
      p-5
      flex flex-col
      gap-6
    ">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Route Controls
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Find safest emergency path in real time
        </p>
      </div>

      {/* Inputs Card */}
      <div className="
        bg-white/5
        border border-white/10
        rounded-2xl
        p-4
        space-y-4
      ">

        {/* Source */}
        <div>
          <label className="text-gray-400 text-sm">
            Source
          </label>

          <input
            type="text"
            placeholder="Enter source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="
              w-full mt-2
              bg-gray-900/60
              border border-gray-700
              rounded-xl
              p-3
              text-white
              outline-none
              focus:border-red-500
              transition
            "
          />
        </div>

        {/* Destination */}
        <div>
          <label className="text-gray-400 text-sm">
            Destination
          </label>

          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="
              w-full mt-2
              bg-gray-900/60
              border border-gray-700
              rounded-xl
              p-3
              text-white
              outline-none
              focus:border-red-500
              transition
            "
          />
        </div>

      </div>

      {/* Primary Action */}
      <button
        onClick={handleFindRoute}
        className="
          bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          transition
          p-3
          rounded-xl
          font-semibold
          text-white
          shadow-lg
          shadow-red-500/20
          hover:scale-[1.02]
        "
      >
        Find Safe Route
      </button>

      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">

        <button
          onClick={simulateTraffic}
          className="
            bg-yellow-500/10
            border border-yellow-500/30
            hover:bg-yellow-500/20
            transition
            p-3
            rounded-xl
            font-semibold
            text-yellow-400
          "
        >
          Traffic
        </button>

        <button
          onClick={handleBlockRoad}
          className={`
            transition
            p-3
            rounded-xl
            font-semibold
            text-white
            ${
              blocked
                ? "bg-red-600"
                : "bg-white/10 border border-white/10 hover:bg-white/20"
            }
          `}
        >
          {blocked ? "Blocked" : "Block"}
        </button>

      </div>

      {/* Status Panel */}
      <div className="
        mt-2
        bg-white/5
        border border-white/10
        rounded-2xl
        p-4
        space-y-3
      ">

        <h3 className="text-white font-semibold">
          Live Status
        </h3>

        {/* Traffic */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Traffic</span>
          <span className="text-yellow-400 font-bold">
            {trafficLevel}/10
          </span>
        </div>

        {/* Safety */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Safety</span>
          <span className="text-green-400 font-bold">
            {trafficLevel > 7 ? "Medium" : "High"}
          </span>
        </div>

        {/* Alerts */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Alerts</span>
          <span className="text-red-400 font-bold">
            {blocked ? "Road Blocked" : "Normal"}
          </span>
        </div>

      </div>

    </div>
  );
}

export default Sidebar;
