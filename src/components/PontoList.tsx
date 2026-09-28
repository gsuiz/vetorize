"use client";

import { useState } from "react";
import { Matriz } from "../types/matriz";

interface PointListProps {
  matriz: Matriz;
  onDelete: (indices: number[]) => void;
}

export default function PontoList({ matriz, onDelete }: PointListProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);

  if (matriz.length === 0) return null;

  const toggleSelection = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleDelete = () => {
    onDelete(selected);
    setIsSelecting(false);
    setSelected([]);
  };

  const handleCancel = () => {
    setIsSelecting(false);
    setSelected([]);
  };

  return (
    <div className="mb-6 flex flex-col gap-2">
      
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-semibold text-muted-foreground">Pontos registrados:</h3>
        
        {!isSelecting ? (
          <button 
            onClick={() => setIsSelecting(true)} 
            className="text-xs font-medium text-primary hover:underline cursor-pointer"
          >
            Selecionar
          </button>
        ) : (
          <div className="flex gap-3">
            <button 
              onClick={handleCancel} 
              className="text-xs font-medium text-muted-foreground hover:underline cursor-pointer"
            >
              Cancelar
            </button>
            <button 
              onClick={handleDelete} 
              disabled={selected.length === 0}
              className="text-xs font-bold text-destructive hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-opacity"
            >
              Excluir ({selected.length})
            </button>
          </div>
        )}
      </div>
      
    
      {matriz.map((p, index) => (
        <div 
          key={index} 
          onClick={() => isSelecting && toggleSelection(index)}
          className={`flex gap-4 items-center p-2 rounded-md border border-border bg-card shadow-sm transition-all ${
            isSelecting ? "cursor-pointer hover:border-primary" : ""
          } ${selected.includes(index) ? "ring-1 ring-primary" : ""}`}
        >
          
          {isSelecting && (
            <input 
              type="checkbox" 
              checked={selected.includes(index)}
              readOnly
              className="w-4 h-4 cursor-pointer accent-primary"
            />
          )}

          <span className="text-sm font-medium text-card-foreground">Ponto {index + 1}:</span>
          <span className="font-mono text-sm text-muted-foreground">x: {p.x}</span>
          <span className="font-mono text-sm text-muted-foreground">y: {p.y}</span>
        </div>
      ))}
    </div>
  );
}