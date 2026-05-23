import { FaRoute } from "react-icons/fa";

function Navbar({ weatherData }) {

  const weather =
    weatherData?.weather?.[0]?.main || "Clear";

  return (
    <nav className="
      w-full
      sticky top-0 z-50
      bg-gray-950/70
      backdrop-blur-xl
      border-b border-white/10
      px-4 md:px-10
      py-4
      flex
      items-center
      justify-between
    ">

      {/* Logo */}
      <div className="flex items-center gap-3">

        <div className="
          bg-gradient-to-br from-red-500 to-red-600
          p-3
          rounded-2xl
          shadow-lg shadow-red-500/20
          hover:scale-105
          transition
          duration-300
        ">
          <FaRoute className="text-white text-xl" />
        </div>

        <div>

          <h1 className="text-white text-xl md:text-2xl font-bold tracking-wide">
            SafeRoute
          </h1>

          <p className="text-gray-400 text-xs md:text-sm">
            Emergency Smart Navigation
          </p>

        </div>

      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-8 text-gray-300">

        <button className="
          hover:text-white
          hover:scale-105
          transition
          duration-200
          relative
          after:content-['']
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-[2px]
          after:w-0
          after:bg-red-500
          hover:after:w-full
          after:transition-all
        ">
          Dashboard
        </button>

        <button className="
          hover:text-white
          hover:scale-105
          transition
          duration-200
          relative
          after:content-['']
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-[2px]
          after:w-0
          after:bg-red-500
          hover:after:w-full
          after:transition-all
        ">
          Routes
        </button>

        <button className="
          hover:text-white
          hover:scale-105
          transition
          duration-200
          relative
          after:content-['']
          after:absolute
          after:left-0
          after:-bottom-1
          after:h-[2px]
          after:w-0
          after:bg-red-500
          hover:after:w-full
          after:transition-all
        ">
          Alerts
        </button>

      </div>

      {/* Status */}
      <div className="
        flex
        items-center
        gap-3
        bg-white/5
        border border-white/10
        px-4
        py-2
        rounded-2xl
        backdrop-blur-lg
        shadow-lg
      ">

        <div className="relative">

          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></div>

          <div className="absolute inset-0 bg-green-500 blur-md opacity-50 rounded-full"></div>

        </div>

        <span className="text-xs md:text-sm text-gray-300">
          Weather: <span className="text-cyan-400 font-semibold">{weather}</span>
        </span>

      </div>

    </nav>
  );
}

export default Navbar;