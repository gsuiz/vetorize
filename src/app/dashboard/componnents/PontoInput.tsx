"use client";

import { useState } from "react";
import { Ponto } from "./PontoManager"; 

interface PointInputProps {
  onAddPoint: (ponto: Ponto) => void;
}

export default function PontoInput({ onAddPoint }: PointInputProps) {
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
    <div className="flex flex-wrap items-end gap-6 mb-8">
      <div className="flex flex-col gap-2">
        <label htmlFor="x" className="text-center font-medium">x</label>
        <input
          id="x"
          type="number"
          value={currentX}
          onChange={(e) => setCurrentX(e.target.value)}
          className="w-16 h-10 border-2 rounded-md text-center focus:outline-none focus:ring-2"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="y" className="text-center font-medium">y</label>
        <input
          id="y"
          type="number"
          value={currentY}
          onChange={(e) => setCurrentY(e.target.value)}
          className="w-16 h-10 border-2 rounded-md text-center focus:outline-none focus:ring-2"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={currentX === "" || currentY === ""}
        className="h-10 px-6 border-2 font-medium transition-opacity disabled:opacity-50"
      >
        adicionar ponto
      </button>
    </div>
  );
}