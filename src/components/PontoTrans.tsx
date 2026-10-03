"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { usePoints } from "@/src/context/PointsContext";
import type { Transformacoes } from "@/src/types";

const campo =
  "w-full h-10 px-3 text-center bg-background border border-input rounded-md focus:outline-none focus:ring-1 focus:ring-ring";

export default function PontoTrans() {
  const { aplicarTransformacoes } = usePoints();
  const [form, setForm] = useState({
    rotacao: false,
    escala: false,
    reflexao: false,
    angulo: "",
    sx: "",
    sy: "",
    eixo: "x",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, type, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const transformacoes: Transformacoes = {
      rotacao: form.rotacao ? { angulo: Number(form.angulo) } : null,
      escala: form.escala ? { sx: Number(form.sx), sy: Number(form.sy) } : null,
      reflexao: form.reflexao ? { eixo: form.eixo } : null,
    };

    aplicarTransformacoes(transformacoes);
  };

  const { desfazerTransformacao, historicoTransformacoes } = usePoints();

  const canDesfazer = historicoTransformacoes.length > 0;

  const nadaSelecionado = !form.rotacao && !form.escala && !form.reflexao;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 mb-6 border border-border rounded-md"
    >
      {/* Rotação */}
      <label className="flex items-center gap-2 font-semibold">
        <input
          id="rotacao"
          type="checkbox"
          checked={form.rotacao}
          onChange={handleChange}
          className="accent-primary"
        />
        Rotação
      </label>
      {form.rotacao && (
        <input
          id="angulo"
          type="number"
          value={form.angulo}
          onChange={handleChange}
          placeholder="Ângulo (graus)"
          className={campo}
        />
      )}

      {/* Escala */}
      <label className="flex items-center gap-2 font-semibold">
        <input
          id="escala"
          type="checkbox"
          checked={form.escala}
          onChange={handleChange}
          className="accent-primary"
        />
        Escala
      </label>
      {form.escala && (
        <div className="flex gap-4">
          <input
            id="sx"
            type="number"
            step="any"
            value={form.sx}
            onChange={handleChange}
            placeholder="Sx"
            className={campo}
          />
          <input
            id="sy"
            type="number"
            step="any"
            value={form.sy}
            onChange={handleChange}
            placeholder="Sy"
            className={campo}
          />
        </div>
      )}

      {/* Reflexão */}
      <label className="flex items-center gap-2 font-semibold">
        <input
          id="reflexao"
          type="checkbox"
          checked={form.reflexao}
          onChange={handleChange}
          className="accent-primary"
        />
        Reflexão
      </label>
      {form.reflexao && (
        <select
          id="eixo"
          value={form.eixo}
          onChange={handleChange}
          className={campo}
        >
          <option value="x">Eixo X</option>
          <option value="y">Eixo Y</option>
          <option value="origem">Origem</option>
        </select>
      )}
      <div className="flex gap-4">
        <button
          disabled={nadaSelecionado}
          className="h-10 px-4 bg-secondary text-secondary-foreground font-medium rounded-md hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Aplicar Transformações
        </button>
        <button
          className=" text-secondary-foreground font-medium rounded-md hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"

          onClick={desfazerTransformacao}
          disabled={!canDesfazer}
        >

          L
        </button>

      </div>

    </form>
  );
}

//no lugar do L tem que taum icone do lucide dps eu procuro