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
    layout: { width: 1200, height: 900, title: { text: "A Fancy Plot" } },
    frames: [],
    config: {},
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
      <Plot
        data={figure.data}
        layout={figure.layout}
        frames={figure.frames}
        config={figure.config}
        onInitialized={setFigure}
        onUpdate={setFigure}
      />
    </div>

  );
}
