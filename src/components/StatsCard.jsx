function StatsCard({
  title,
  value,
  color = "text-white",
  subtitle,
  icon: Icon,
}) {

  return (
    <div className="
      relative
      bg-white/5
      backdrop-blur-xl
      border border-white/10
      rounded-2xl
      p-5
      shadow-lg
      hover:scale-[1.03]
      hover:border-white/20
      transition-all
      duration-300
      overflow-hidden
    ">

      {/* Glow Background Effect */}
      <div className="
        absolute
        -top-10
        -right-10
        w-32
        h-32
        bg-red-500/10
        rounded-full
        blur-3xl
      " />

      {/* Header Row */}
      <div className="flex items-center justify-between">

        <p className="text-gray-400 text-sm">
          {title}
        </p>

        {/* Optional Icon */}
        {Icon && (
          <Icon className="text-gray-500 text-xl" />
        )}

      </div>

      {/* Main Value */}
      <h2 className={`
        text-3xl
        font-bold
        mt-3
        ${color}
      `}>
        {value}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default StatsCard;