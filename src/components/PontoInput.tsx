"use client";

import { useState, useRef, ChangeEvent, SubmitEvent } from "react";
import { usePoints } from "../context/PointsContext";

export default function PontoInput() {
  const { addPoint } = usePoints();

  const firstInputRef = useRef<HTMLInputElement>(null);

  const [currentValue, setCurrentValue] = useState<{ x: string; y: string }>({
    x: "",
    y: "",
  });
  const [err, setErr] = useState<string>("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentValue.x.trim() === "" || currentValue.y.trim() === "") return;

    addPoint(
      [
        Number(currentValue.x),
        Number(currentValue.y)
      ],
      setErr,
    );

    setCurrentValue({ x: "", y: "" });

    firstInputRef.current?.focus();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id: string = e.target.id;
    const value: string = e.target.value;

    setCurrentValue((prev) => ({ ...prev, [id]: value }));
    setErr("");
  };

  return (
    <div className="flex flex-col gap-4 mb-8">
      {err && <div className="text-red-500">Erro: {err}</div>}
      <form className="flex gap-4 items-end" onSubmit={handleSubmit}>
        {/* Caixa do X */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="x"
            className="text-sm font-semibold text-muted-foreground text-center"
          >
            X
          </label>
          <input
            id="x"
            type="number"
            value={currentValue.x}
            onChange={handleChange}
            placeholder="0"
            ref={firstInputRef}
            className="w-full h-10 px-3 text-center bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>

        {/* Caixa do Y */}
        <div className="flex flex-col gap-1.5 w-full">
          <label
            htmlFor="y"
            className="text-sm font-semibold text-muted-foreground text-center"
          >
            Y
          </label>
          <input
            id="y"
            type="number"
            value={currentValue.y}
            onChange={handleChange}
            placeholder="0"
            className="w-full h-10 px-3 text-center bg-background border border-input rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold opacity-0 select-none">
            T
          </label>
          <button
            disabled={currentValue.x === "" || currentValue.y === ""}
            className="h-10 px-4 bg-secundary hover:opacity-90 text-secundary-foreground font-medium rounded-md transition-all shadow-sm whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar Ponto
          </button>
        </div>
      </form>
    </div>
  );
}
