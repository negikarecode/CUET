import React from "react";

export default function FooterHills({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none ${className}`}>
      <svg
        viewBox="0 0 1440 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto block"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hillLayer1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#86D2BC" />
            <stop offset="100%" stopColor="#48A88B" />
          </linearGradient>

          <linearGradient id="hillLayer2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#439C80" />
            <stop offset="100%" stopColor="#256B55" />
          </linearGradient>

          <linearGradient id="hillLayer3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#226651" />
            <stop offset="100%" stopColor="#123E30" />
          </linearGradient>
        </defs>

        {/* Back Wave */}
        <path
          d="M 0 120 Q 360 40 720 100 T 1440 70 L 1440 240 L 0 240 Z"
          fill="url(#hillLayer1)"
          opacity="0.6"
        />

        {/* Middle Wave with stylized pine trees */}
        <path
          d="M 0 140 Q 420 80 840 130 T 1440 100 L 1440 240 L 0 240 Z"
          fill="url(#hillLayer2)"
        />

        {/* Tree Silhouettes on middle wave */}
        <g fill="#1F5744" opacity="0.75">
          <polygon points="120,130 130,105 140,130" />
          <polygon points="135,128 143,108 151,128" />
          <polygon points="148,132 155,114 162,132" />
          <polygon points="340,118 350,92 360,118" />
          <polygon points="355,116 363,96 371,116" />
          <polygon points="980,125 990,98 1000,125" />
          <polygon points="995,123 1004,102 1013,123" />
          <polygon points="1220,115 1230,88 1240,115" />
        </g>

        {/* Front Foreground Deep Forest Wave */}
        <path
          d="M 0 170 Q 380 120 760 160 T 1440 140 L 1440 240 L 0 240 Z"
          fill="url(#hillLayer3)"
        />
      </svg>
    </div>
  );
}
