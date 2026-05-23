function AlertBox({
  weatherData,
  trafficLevel,
}) {

  const weatherCondition =
    weatherData?.weather?.[0]?.main || "Clear";

  // Dynamic Alert Message
  let alertMessage =
    "Emergency route operating normally.";

  let alertColor =
    "border-green-500/30 bg-green-500/10";

  let buttonColor =
    "bg-green-500 hover:bg-green-600 hover:shadow-green-500/40";

  let statusColor =
    "text-green-400";

  // Traffic Alert
  if (trafficLevel > 7) {

    alertMessage =
      "Heavy traffic detected. Alternate route recommended.";

    alertColor =
      "border-yellow-500/30 bg-yellow-500/10";

    buttonColor =
      "bg-yellow-500 hover:bg-yellow-600 hover:shadow-yellow-500/40";

    statusColor =
      "text-yellow-400";
  }

  // Weather Alert
  if (
    weatherCondition === "Rain" ||
    weatherCondition === "Thunderstorm"
  ) {

    alertMessage =
      "Bad weather detected. Drive carefully.";

    alertColor =
      "border-red-500/30 bg-red-500/10";

    buttonColor =
      "bg-red-500 hover:bg-red-600 hover:shadow-red-500/40";

    statusColor =
      "text-red-400";
  }

  return (

    <div
      className={`
        ${alertColor}
        backdrop-blur-xl
        border
        rounded-3xl
        p-5
        shadow-xl
        flex
        flex-col
        lg:flex-row
        items-start
        lg:items-center
        justify-between
        gap-6
        transition-all
        duration-300
      `}
    >

      {/* Left Content */}
      <div className="flex-1">

        {/* Header */}
        <div className="flex items-center gap-3">

          {/* Pulse Indicator */}
          <div className="relative">

            <div className={`w-3 h-3 rounded-full ${statusColor.replace("text", "bg")} animate-pulse`} />

            <div className={`absolute inset-0 rounded-full blur-md opacity-70 ${statusColor.replace("text", "bg")}`} />

          </div>

          <h3 className={`font-bold text-xl ${statusColor}`}>
            Emergency Alert
          </h3>

        </div>

        {/* Message */}
        <p className="text-gray-300 text-sm md:text-base mt-3 leading-relaxed">
          {alertMessage}
        </p>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

          {/* Traffic */}
          <div className="
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            rounded-2xl
            px-4
            py-3
            hover:scale-105
            transition
            duration-300
          ">

            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Traffic
            </p>

            <h4 className="text-yellow-400 font-bold text-lg mt-1">
              {trafficLevel}/10
            </h4>

          </div>

          {/* Weather */}
          <div className="
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            rounded-2xl
            px-4
            py-3
            hover:scale-105
            transition
            duration-300
          ">

            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Weather
            </p>

            <h4 className="text-cyan-400 font-bold text-lg mt-1">
              {weatherCondition}
            </h4>

          </div>

          {/* Route */}
          <div className="
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            rounded-2xl
            px-4
            py-3
            hover:scale-105
            transition
            duration-300
          ">

            <p className="text-gray-400 text-xs uppercase tracking-wide">
              Route
            </p>

            <h4 className="text-green-400 font-bold text-lg mt-1">
              Active
            </h4>

          </div>

        </div>

      </div>

      {/* Button */}
      <button
        className={`
          ${buttonColor}
          px-5
          py-3
          rounded-2xl
          font-semibold
          text-white
          shadow-lg
          transition-all
          duration-300
          hover:scale-105
          whitespace-nowrap
        `}
      >
        Recalculate Route
      </button>

    </div>
  );
}

export default AlertBox;