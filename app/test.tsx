'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

const PlotlyPlane = dynamic(() => import('../components/PlotlyPlane'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <span className="text-gray-500 text-lg">Carregando gráfico...</span>
    </div>
  ),
});

type Point = { x: number; y: number; label: string };

export default function Home() {
  const [points, setPoints] = useState<Point[]>([]);
  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [nextLabel, setNextLabel] = useState(1);

  const addPoint = useCallback(
    (x?: number, y?: number) => {
      const px = x ?? parseFloat(inputX);
      const py = y ?? parseFloat(inputY);
      if (isNaN(px) || isNaN(py)) return;

      const label = `P${nextLabel}`;
      setPoints((prev) => [...prev, { x: px, y: py, label }]);
      setNextLabel((n) => n + 1);
      setInputX('');
      setInputY('');
    },
    [inputX, inputY, nextLabel],
  );

  const handlePointClick = useCallback(
    (x: number, y: number) => {
      setInputX(String(x));
      setInputY(String(y));
    },
    [],
  );

  const removePoint = useCallback((index: number) => {
    setPoints((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearAll = useCallback(() => {
    setPoints([]);
    setNextLabel(1);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') addPoint();
    },
    [addPoint],
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            Plano Cartesiano
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Clique no gráfico para selecionar coordenadas
          </p>
        </div>

        {/* Input de pontos */}
        <div className="p-4 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Adicionar Ponto
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={inputX}
              onChange={(e) => setInputX(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="X"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.25"
            />
            <input
              type="number"
              value={inputY}
              onChange={(e) => setInputY(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Y"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              step="0.25"
            />
          </div>
          <button
            onClick={() => addPoint()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Adicionar
          </button>
        </div>

        {/* Lista de pontos */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-700">
              Pontos ({points.length})
            </h2>
            {points.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700 font-medium cursor-pointer"
              >
                Limpar tudo
              </button>
            )}
          </div>
          {points.length === 0 ? (
            <p className="text-sm text-gray-400 italic">
              Nenhum ponto adicionado
            </p>
          ) : (
            <ul className="space-y-2">
              {points.map((pt, i) => (
                <li
                  key={`${pt.label}-${i}`}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 group"
                >
                  <div>
                    <span className="font-semibold text-gray-800">
                      {pt.label}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({pt.x}, {pt.y})
                    </span>
                  </div>
                  <button
                    onClick={() => removePoint(i)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity text-sm cursor-pointer"
                    title="Remover"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Instruções */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-xs text-gray-500 leading-relaxed">
            <strong>Scroll</strong> para zoom · <strong>Arrastar</strong> para
            mover · <strong>Clique</strong> no gráfico para capturar
            coordenadas
          </p>
        </div>
      </aside>

      {/* Área do gráfico */}
      <main className="flex-1 p-4">
        <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <PlotlyPlane
            points={points}
            onPointClick={handlePointClick}
            range={[-10, 10]}
          />
        </div>
      </main>
    </div>
  );
}
