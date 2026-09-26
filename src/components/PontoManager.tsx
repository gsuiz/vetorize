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
        <aside className="h-screen w-80 border-r-2 flex flex-col p-6 overflow-y-auto shrink-0">
            
                <div className="flex-1 flex flex-col">
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
        </aside>
    );
}