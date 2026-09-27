"use client";

import { useState, useEffect } from "react";
import PontoInput from "./PontoInput";
import PointList from "./PontoList";

export type Ponto = {
    x: number;
    y: number;
};

export type MatrizDTO = Ponto[];

export default function PontoManager() {
    const [matriz, setMatriz] = useState<MatrizDTO>([]);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    const handleAddPoint = (novoPonto: Ponto) => {
        setMatriz([...matriz, novoPonto]);
    };

    const handleDeletePoints = (indicesParaRemover: number[]) => {
        setMatriz(matriz.filter((_, index) => !indicesParaRemover.includes(index)));
    };

    const handleVisualizar = () => {
        console.log("DTO Matriz para envio/visualização:", matriz);
    };

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
            setIsDark(false);
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
            setIsDark(true);
        }
    };

    return (
        <aside className="h-screen w-80 bg-background border-r border-border flex flex-col p-6 shadow-lg z-10 shrink-0 transition-colors duration-200">
            
            <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-foreground">Plano Cartesiano</h2>
                    
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-md hover:opacity-90 transition-all shadow-sm cursor-pointer"
                    >
                        {isDark ? "Claro" : "Escuro"}
                    </button>
                </div>
                
                <PontoInput 
                    onAddPoint={handleAddPoint} 
                    onVisualizar={handleVisualizar}
                    temPontos={matriz.length > 0}
                />
                
        
                <PointList matriz={matriz} onDelete={handleDeletePoints} />
            </div>

        </aside>
    );
}