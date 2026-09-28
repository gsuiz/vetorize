"use client";

import { useState } from "react";
import PontoInput from "./PontoInput";
import PointList from "./PontoList";
import { Matriz } from "../types/matriz";
import { Vetor } from "../types/vetor";

interface PontoManagerProps {
    matriz: Matriz
    onMatrizChange: (nova:Matriz) => void
}

export default function PontoManager({matriz, onMatrizChange}: PontoManagerProps) {

    const handleAddPoint = (novoPonto: Vetor) => {
        onMatrizChange([...matriz, novoPonto])
    };
    return (
        <aside className="h-screen w-80 border-r-2 flex flex-col p-6 overflow-y-auto shrink-0">
            
                <div className="flex-1 flex flex-col">
                    <PointList matriz={matriz} />

                    <PontoInput onAddPoint={handleAddPoint} />
                </div>

                <div className="flex justify-center mt-auto pt-8">
                    <button
                        className="px-8 py-2 border-2 font-medium transition-transform hover:scale-105"
                    >
                        visualizar
                    </button>
                </div>
        </aside>
    );
}