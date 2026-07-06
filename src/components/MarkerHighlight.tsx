export function MarkerHighlight({ 
  children, 
  color = "#FFD700", 
}: { 
  children: string; 
  color?: string; 
}) { 
  return ( 
    <span className="relative inline-block"> 
      {/* SVG highlight manuscrit en arrière-plan */} 
      <svg 
        aria-hidden="true" 
        viewBox="0 0 300 45" 
        preserveAspectRatio="none" 
        className="absolute inset-0 w-full h-full -z-10" 
        style={{ top: "10%", left: "-3%", width: "106%", height: "88%" }} 
      > 
        <path 
          d="M4,28 C30,18 80,12 150,14 C220,16 270,20 296,26 C280,34 220,38 150,36 C80,34 20,32 4,28 Z" 
          fill={color} 
          opacity="0.55" 
          style={{ 
            filter: "url(#roughen)", 
          }} 
        /> 
        <defs> 
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.04" 
            numOctaves="4" 
            id="noise" 
          /> 
          <filter id="roughen"> 
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.05" 
              numOctaves="2" 
              result="noise" 
              seed="2" 
            /> 
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="3" 
              xChannelSelector="R" 
              yChannelSelector="G" 
            /> 
          </filter> 
        </defs> 
      </svg> 
      {/* Texte en couleur sombre pour contraster avec le fond jaune */} 
      <span className="relative" style={{ color: "#1D0101" }}> 
        {children} 
      </span> 
    </span> 
  ); 
}