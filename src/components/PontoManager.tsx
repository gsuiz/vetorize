"use client";

import { useState, useLayoutEffect } from "react";
import PontoInput from "./PontoInput";
import PontoList from "./PontoList";
import PontoTrans from "./PontoTrans";

export default function PontoManager() {
  const [isDark, setIsDark] = useState(false);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

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
          <h2 className="text-lg font-bold text-foreground">
            Plano Cartesiano
          </h2>
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 bg-secondary text-secondary-foreground text-xs font-bold rounded-md hover:opacity-90 transition-all shadow-sm cursor-pointer"
          >
            {isDark ? "Claro" : "Escuro"}
          </button>
        </div>
        <PontoTrans/>
        <PontoInput />

        <PontoList />
      </div>
    </aside>
  );
}
