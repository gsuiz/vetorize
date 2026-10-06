"use client";

import PontoInput from "./PontoInput";
import PontoList from "./PontoList";
import PontoTrans from "./PontoTrans";

export default function PontoManager() {

  return (
    <aside className="h-screen w-80 bg-background border-r border-border flex flex-col p-6 shadow-lg z-10 shrink-0 transition-colors duration-200">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-foreground">
            Plano Cartesiano
          </h2>
        </div>
        <PontoTrans/>
        <PontoInput />

        <PontoList />
      </div>
    </aside>
  );
}
