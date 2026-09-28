'use client'

import { useState } from "react";
import dynamic from "next/dynamic";
import PontoManager from "../components/PontoManager";
import { Matriz } from "../types/matriz";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div>Carregando gráfico...</div>
});

export default function page() {
  const [matriz, setMatriz] = useState<Matriz>([]);

  const [figure, setFigure] = useState<any>({
    data: [
      {
        x: [],
        y: [],
        type: "scatter",
        mode: "lines+markers",
        marker: { color: "red" },
      },
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
  const handleMatrizChange = (nova: Matriz) => {
    setMatriz(nova)
    setFigure((prev: any) => ({
      ...prev,
      data: [
        {
          ...prev.data[0],
          x: nova.map((p) => p.x),
          y: nova.map((p) => p.y)
        }
      ]
    })
    )
  }

  return (
    <div className="h-screen flex w-full">
      <PontoManager matriz={matriz} onMatrizChange={handleMatrizChange} />
      
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