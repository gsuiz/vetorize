"use client";

import { useState, useEffect } from "react";
import { usePoints } from "../context/PointsContext";
import dynamic from "next/dynamic";
import PontoManager from "../components/PontoManager";
import type { Data, Layout, Config } from "plotly.js";
import { FigureCallback } from "react-plotly.js";

const Plot = dynamic(() => import("react-plotly.js"), {
  ssr: false,
  loading: () => <div>Carregando gráfico...</div>,
});

interface FigureState {
  data: Data[];
  layout: Partial<Layout>;
  config?: Partial<Config>;
}

export default function Page() {
  const { points } = usePoints();

  useEffect(() => {
    console.log(points);
  }, [points]);

  const [figure, setFigure] = useState<FigureState>({
    data: [
      {
        x: points.map((item) => item[0]),
        y: points.map((item) => item[1]),
        type: "scatter",
        mode: "markers",
        marker: { color: "red", size: 12 },
        line: { width: 5 },
        fill: "toself",
      },
    ],
    layout: {
      autosize: true,
      dragmode: "pan",
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",

      xaxis: {
        gridcolor: "#222222",
        zerolinecolor: "#444444",
        tickfont: { color: "#a1a1aa" },
      },
      yaxis: {
        gridcolor: "#222222",
        zerolinecolor: "#444444",
        tickfont: { color: "#a1a1aa" },
        scaleanchor: "x",
        scaleratio: 1,
      },
      margin: { l: 50, r: 50, t: 60, b: 50 },
    },
    config: {
      responsive: true,
      displayModeBar: false,
      scrollZoom: true,
    },
  });

  useEffect(() => {
    const xCoord: number[] = points.map((point) => point[0]);
    const yCoord: number[] = points.map((point) => point[1]);

    const maxX: number = Math.max(...xCoord);
    const minX: number = Math.min(...xCoord);
    const maxY: number = Math.max(...yCoord);
    const minY: number = Math.min(...yCoord);

    const PADDING: number = 1.5;

    setFigure((prev: FigureState) => ({
      ...prev,
      data: [
        {
          ...prev.data[0],
          x: xCoord,
          y: yCoord,
        },
      ],
      layout: {
        ...prev.layout,
        xaxis: {
          range: [minX - PADDING, maxX + PADDING],
          ...prev.layout.xaxis,
        },
        yaxis: {
          range: [minY - PADDING, maxY + PADDING],
          ...prev.layout.yaxis,
        },
      },
    }));
  }, [points]);

  const updateFigure = (figure: FigureState) => {
    setFigure((prev) => ({
      ...prev,
      ...figure,
    }));
  };

  return (
    <div className="h-screen flex w-full">
      <PontoManager />

      <main className="flex-1 p-8 w-full h-full bg-background flex items-center justify-center">
        <div className="w-full h-full max-w-6xl max-h-[800px]">
          <Plot
            data={figure.data}
            layout={figure.layout}
            config={figure.config}
            onInitialized={updateFigure as FigureCallback}
            onUpdate={updateFigure as FigureCallback}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </main>
    </div>
  );
}
