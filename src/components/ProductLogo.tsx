import React from "react";

interface ProductLogoProps {
  logoLetter?: string;
  logoColor?: string;
  name: string;
  size?: string;
  fontSize?: string;
  borderRadius?: string;
}

export default function ProductLogo({
  logoLetter,
  logoColor = "#6366f1",
  name,
  size = "88px",
  fontSize = "2rem",
  borderRadius = "16px"
}: ProductLogoProps) {
  const isUrl = logoLetter && (
    logoLetter.startsWith("http://") || 
    logoLetter.startsWith("https://") || 
    logoLetter.startsWith("/") || 
    logoLetter.includes(".") || 
    logoLetter.includes("/")
  );

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: borderRadius,
      border: `2px solid ${logoColor}`,
      boxShadow: `0 0 20px ${logoColor}30`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: `${logoColor}12`,
      overflow: "hidden",
      flexShrink: 0
    }}>
      {isUrl ? (
        <img 
          src={logoLetter} 
          alt={name} 
          style={{ width: "100%", height: "100%", objectFit: "cover" }} 
        />
      ) : (
        <div style={{ fontSize: fontSize, fontWeight: "900", color: logoColor, textTransform: "uppercase" }}>
          {logoLetter || name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
