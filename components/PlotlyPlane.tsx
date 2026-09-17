'use client';

import { useState, useCallback } from 'react';
import Plot from 'react-plotly.js';

type Point = { x: number; y: number; label?: string };

interface PlotlyPlaneProps {
  points?: Point[];
  onPointClick?: (x: number, y: number) => void;
  range?: [number, number];
  className?: string;
}

export default function PlotlyPlane({
  points = [],
  onPointClick,
  range: axisRange = [-10, 10],
  className,
}: PlotlyPlaneProps) {
  const [layout, setLayout] = useState({
    xaxis: {
      range: axisRange,
      dtick: 1,
      gridcolor: '#e0e0e0',
      gridwidth: 1,
      zeroline: true,
      zerolinewidth: 2,
      zerolinecolor: '#000',
      title: { text: 'x', font: { size: 16 } },
      fixedrange: false,
    },
    yaxis: {
      range: axisRange,
      dtick: 1,
      gridcolor: '#e0e0e0',
      gridwidth: 1,
      zeroline: true,
      zerolinewidth: 2,
      zerolinecolor: '#000',
      title: { text: 'y', font: { size: 16 } },
      scaleanchor: 'x',
      scaleratio: 1,
      fixedrange: false,
    },
    margin: { l: 50, r: 30, t: 30, b: 50 },
    paper_bgcolor: '#fff',
    plot_bgcolor: '#fafafa',
    dragmode: 'pan' as const,
    hovermode: 'closest' as const,
    showlegend: false,
  });

  const handleClick = useCallback(
    (data: { points: Array<{ x: number; y: number }> }) => {
      if (!onPointClick || data.points.length === 0) return;
      const pt = data.points[0];
      onPointClick(
        Math.round(pt.x * 4) / 4,
        Math.round(pt.y * 4) / 4,
      );
    },
    [onPointClick],
  );

  const handleRelayout = useCallback(
    (update: Record<string, unknown>) => {
      setLayout((prev) => ({ ...prev, ...update }));
    },
    [],
  );

  const scatterTrace = {
    x: points.map((p) => p.x),
    y: points.map((p) => p.y),
    text: points.map((p) => p.label ?? `(${p.x}, ${p.y})`),
    mode: 'markers' as const,
    type: 'scatter' as const,
    marker: {
      color: '#e74c3c',
      size: 10,
      line: { color: '#c0392b', width: 2 },
    },
    hoverinfo: 'text' as const,
  };

  return (
    <div className={className}>
      <Plot
        data={[scatterTrace]}
        layout={layout}
        config={{
          scrollZoom: true,
          displayModeBar: true,
          modeBarButtonsToRemove: ['lasso2d', 'select2d'],
          displaylogo: false,
          responsive: true,
        }}
        onClick={handleClick}
        onRelayout={handleRelayout}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
