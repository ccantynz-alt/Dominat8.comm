import React from "react";

/**
 * DXL-01 Global Atmosphere Layer
 * - Server-safe (no "use client")
 * - Pure DOM + CSS background layers
 * - No interaction, no layout changes
 */
export function DxlAtmosphere() {
  return (
    <div aria-hidden className="dxl-atmo">
      <div className="dxl-atmo__layer dxl-atmo__base" />
      <div className="dxl-atmo__layer dxl-atmo__glowA" />
      <div className="dxl-atmo__layer dxl-atmo__glowB" />
      <div className="dxl-atmo__layer dxl-atmo__noise" />
      <div className="dxl-atmo__layer dxl-atmo__vignette" />
    </div>
  );
}

export default DxlAtmosphere;