import React from "react";

export default function GlobalLoader() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "80vh",
      width: "100%",
      gap: "1.5rem",
      backgroundColor: "var(--background)",
      color: "var(--text-primary)",
      transition: "background-color 0.3s ease",
      fontFamily: "var(--font-sans)",
      padding: "2rem"
    }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer glowing pulsing circle */}
        <div className="loader-glow" style={{
          position: "absolute",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--primary) 0%, rgba(var(--primary-rgb), 0) 70%)",
          filter: "blur(4px)",
          opacity: 0.6,
          animation: "loaderPulse 2s infinite ease-in-out"
        }} />
        
        {/* Spinner */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "3px solid rgba(var(--primary-rgb), 0.1)",
          borderTopColor: "var(--primary)",
          animation: "loaderSpin 1s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite"
        }} />
      </div>

      {/* Brand & Loading Info */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
        <h2 style={{ 
          fontSize: "1.25rem", 
          fontWeight: 900, 
          letterSpacing: "-0.03em",
          color: "var(--text-primary)"
        }}>
          ipopreipo<span className="logo-accent">pre</span><span className="logo-tld">.com</span>
        </h2>
        <p style={{
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          fontWeight: 600,
          animation: "loaderTextFade 1.5s infinite ease-in-out"
        }}>
          Loading Financial Data...
        </p>
      </div>

      {/* Embedded Animations */}
      <style>{`
        @keyframes loaderSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loaderPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }
        @keyframes loaderTextFade {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
