"use client";

import { useState } from "react";
import PontoInput from "./PontoInput";
import PointList from "./PontoList";

export type Ponto = {
  x: number;
  y: number;
};

export type MatrizDTO = Ponto[];

export default function PontoManager() {
  const [matriz, setMatriz] = useState<MatrizDTO>([]);

  const handleAddPoint = (novoPonto: Ponto) => {
    setMatriz([...matriz, novoPonto]);
  };

  const handleVisualizar = () => {
    console.log("DTO Matriz para envio/visualização:", matriz);
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-start pt-24">
      
      <div className="border-2 rounded-xl p-8 w-full max-w-2xl flex flex-col min-h-[400px]">
        
        <div className="flex-1">
          <PointList matriz={matriz} />
          
          <PontoInput onAddPoint={handleAddPoint} />
        </div>

        <div className="flex justify-center mt-auto pt-8">
          <button
            onClick={handleVisualizar}
            className="px-8 py-2 border-2 font-medium transition-transform hover:scale-105"
          >
            visualizar
          </button>
        </div>
      </div>

    </div>
  );
}