'use client'

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PontoManager from "../components/PontoManager";
import type { Matriz } from "../types/matriz";
import type { Data, Layout, Config } from "plotly.js";
import { FigureCallback } from "react-plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div>Carregando gráfico...</div>
});

interface FigureState {
  data:Data[],
  layout: Partial<Layout>,
  config?: Partial<Config>
}

export default function Page() {
  const [matriz, setMatriz] = useState<Matriz>([]);

  useEffect(() => {
    console.log(matriz.map(item => item.x))
  }, [matriz]) 
     
  const [figure, setFigure] = useState<FigureState>({
    data: [
      {  
        x: matriz.map(item => item.x),
        y: matriz.map(item => item.y), 
        type: "scatter",
        mode: "markers",
        marker: { color: "red", size:12 },
        line: { width:5  },
        fill:"toself"
      },
    ],
    layout: { 
      autosize: true,
      dragmode:"pan",
      paper_bgcolor: 'transparent', 
      plot_bgcolor: 'transparent',  

      xaxis: { 
        gridcolor: '#222222',
        zerolinecolor: '#444444', 
        tickfont: { color: '#a1a1aa' }, 
      }, 
      yaxis: { 
        gridcolor: '#222222', 
        zerolinecolor: '#444444',
        tickfont: { color: '#a1a1aa' } 
      },
      margin: { l: 50, r: 50, t: 60, b: 50 } 
    }, 
    config: { 
      responsive: true, 
      displayModeBar: false,
      scrollZoom:true  
    },
  });
  const handleMatrizChange = (nova: Matriz) => {
    setMatriz(nova)
    setFigure((prev: FigureState) => ({
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
              config={figure.config}
              onInitialized={setFigure as FigureCallback}
              onUpdate={setFigure as FigureCallback}
              useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </main>
    </div>
    
  );
}