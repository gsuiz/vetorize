"use client";

import { useState } from "react";
import { Vetor } from "../types/vetor";

interface PointInputProps {
  onAddPoint: (ponto: Vetor) => void;
  temPontos: boolean;
}

export default function PontoInput({ onAddPoint, temPontos }: PointInputProps) {
  const [currentX, setCurrentX] = useState<string>("");
  const [currentY, setCurrentY] = useState<string>("");

  const handleAdd = () => {
    if (currentX === "" || currentY === "") return;

    onAddPoint({
      x: Number(currentX),
      y: Number(currentY),
    });

    setCurrentX("");
    setCurrentY("");
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      
      <div className="flex gap-4 items-end">
        {/* Caixa do X */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="x" className="text-sm font-semibold text-muted-foreground text-center">X</label>
          <input
            id="x"
            type="number"
            value={currentX}
            onChange={(e) => setCurrentX(e.target.value)}
            placeholder="0"
            className="w-full h-10 px-3 text-center bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>

        {/* Caixa do Y */}
        <div className="flex flex-col gap-1.5 w-full">
          <label htmlFor="y" className="text-sm font-semibold text-muted-foreground text-center">Y</label>
          <input
            id="y"
            type="number"
            value={currentY}
            onChange={(e) => setCurrentY(e.target.value)}
            placeholder="0"
            className="w-full h-10 px-3 text-center bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold opacity-0 select-none">T</label>
          <button
            onClick={handleAdd}
            disabled={currentX === "" || currentY === ""}
            className="h-10 px-4 bg-secundary hover:opacity-90 text-secundary-foreground font-medium rounded-md transition-all shadow-sm whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar Ponto
          </button>
        </div>
      </div>      
    </div>
  );
}