"use client";

import { useState } from "react";
import Plot from "react-plotly.js";
import PontoManager from "../components/PontoManager";

export default function page() {
  const [figure, setFigure] = useState<any>({
    data: [
        {
          x: [1, 2, 3], 
          y: [2, 6, 3],
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "#ef4444" },
        },
        { type: "bar", x: [1, 2, 3], y: [2, 5, 3], marker: { color: "#f97316" } }
    ],
    layout: { 
      autosize: true,
      title: { text: "Gráfico de Teste", font: { color: '#ffffff', size: 20 } },
      paper_bgcolor: 'transparent', 
      plot_bgcolor: 'transparent',  
      xaxis: { 
        gridcolor: '#222222',
        zerolinecolor: '#444444', 
        tickfont: { color: '#a1a1aa' } 
      }, 
      yaxis: { 
        gridcolor: '#222222', 
        zerolinecolor: '#444444',
        tickfont: { color: '#a1a1aa' } 
      },
      margin: { l: 50, r: 50, t: 60, b: 50 } 
    },
    frames: [], 
    config: { responsive: true, displayModeBar: false },
  });

  return (
    <div className="h-screen flex w-full">
      <PontoManager/>
      
      <main className="flex-1 p-8 w-full h-full bg-background flex items-center justify-center">
        <div className="w-full h-full max-w-6xl max-h-[800px]">
          <Plot
            data={figure.data}
            layout={figure.layout}
            frames={figure.frames}
            config={figure.config}
            onInitialized={setFigure}
            onUpdate={setFigure}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </main>
    </div>
  );
}