"use client";

import { useState } from "react";
import Plot from "react-plotly.js";

export default function page() {
  const [figure, setFigure] = useState<any>({
    data: [
        {
          x: [1, 2, 3], 
          y: [2, 6, 3],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
        },
        { type: "bar", x: [1, 2, 3], y: [2, 5, 3] }
    ],
    layout: { width: 600, height: 440, title: { text: "A Fancy Plot" } },
    frames: [], 
    config: {},
  });

  return (
    <Plot
      data={figure.data}
      layout={figure.layout}
      frames={figure.frames}
      config={figure.config}
      onInitialized={setFigure}
      onUpdate={setFigure}
    />
  );
}
