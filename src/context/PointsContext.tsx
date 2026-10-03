"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import type { Matriz, Vector, Transformacoes } from "../types";
import { transformarPontos } from "../utils/matrix";

export const MATRIZ_REFLEXAO_X: Matriz = [[1, 0], [0, -1]];
export const MATRIZ_REFLEXAO_Y: Matriz = [[-1, 0], [0, 1]];
export const MATRIZ_REFLEXAO_ORIGEM: Matriz = [[-1, 0], [0, -1]];

interface HistoricoItem {
  transformacao: Transformacoes;
  pontosAnteriores: Matriz;
}

interface PointsContextType {
  points: Matriz;
  historicoTransformacoes: HistoricoItem[];
  addPoint: (newPoint: Vector, setErr: (param: string) => void) => void;
  removePoints: (pointIndices: number[]) => void;
  aplicarTransformacoes: (transformacoes: Transformacoes) => void;
  desfazerTransformacao: () => void;
}

interface PointsProviderProps {
  children: ReactNode;
}

const PointsContext = createContext<PointsContextType | null>(null);

const sumPoints = (param: number[]) => {
  return param.reduce((acc, item) => (acc += item), 0);
};

const includesPoint = (currentPoints: Matriz, newPoint: Vector): boolean => {
  return currentPoints.some((p) => {
    return p[0] === newPoint[0] && p[1] === newPoint[1];
  });
};

const organizePoints = (newPoints: Matriz): Matriz => {
  const xCoord: number[] = newPoints.map((item) => item[0]);
  const yCoord: number[] = newPoints.map((item) => item[1]);

  const length = newPoints.length;

  const centerX = sumPoints(xCoord) / length;
  const centerY = sumPoints(yCoord) / length;

  const pointsWithAngle = newPoints.map((item) => {
    const deltaX: number = item[0] - centerX;
    const deltaY: number = item[1] - centerY;

    const angle = Math.atan2(deltaY, deltaX);

    return { vetor: item, angle };
  });

  const orderedByAngle = pointsWithAngle.sort((a, b) => a.angle - b.angle);

  return orderedByAngle.map((item) => item.vetor);
};

export function usePoints() {
  const context = useContext(PointsContext);

  if (!context) {
    throw new Error("ERROR IN CONTEXT");
  }

  return context;
}

export default function PointsProvider({ children }: PointsProviderProps) {
  const [points, setPoints] = useState<Matriz>([]);
  const [historicoTransformacoes, setHistoricoTransformacoes] = useState<HistoricoItem[]>([]);

  const addPoint = (newPoint: Vector, setErr: (param: string) => void) => {
    if (!includesPoint(points, newPoint)) {
      let newPoints: Matriz = [...points, newPoint];

      if (newPoints.length >= 3) {
        newPoints = organizePoints(newPoints);
      }

      setPoints(newPoints);
    } else {
      setErr("Ponto já adicionado.");
    }
  };

  const removePoints = (pointsIndices: number[]) => {
    setPoints((prev: Matriz) =>
      prev.filter((_, index) => !pointsIndices.includes(index)),
    );
  };

  const aplicarTransformacoes = (transformacoes: Transformacoes) => {
    if (points.length === 0) return;

    setHistoricoTransformacoes((prev) => [
      ...prev, { 
        transformacao: transformacoes, pontosAnteriores: points 
      }
    ]);

    let novosPontos = [...points];

    if (transformacoes.escala) {
      const { sx, sy } = transformacoes.escala;
      const matrizEscala: Matriz = [[sx, 0], [0, sy]];
      novosPontos = transformarPontos(novosPontos, matrizEscala);
    }

    if (transformacoes.rotacao) {
      const rad = transformacoes.rotacao.angulo * (Math.PI / 180);
      const matrizRotacao: Matriz = [
        [Math.cos(rad), Math.sin(rad)],
        [-Math.sin(rad), Math.cos(rad)],
      ];
      novosPontos = transformarPontos(novosPontos, matrizRotacao);
    }

    if (transformacoes.reflexao) {
      let matrizReflexao = MATRIZ_REFLEXAO_ORIGEM;
      if (transformacoes.reflexao.eixo === "x") matrizReflexao = MATRIZ_REFLEXAO_X;
      else if (transformacoes.reflexao.eixo === "y") matrizReflexao = MATRIZ_REFLEXAO_Y;
      
      novosPontos = transformarPontos(novosPontos, matrizReflexao);
    }

    setPoints(novosPontos);
  };

  const desfazerTransformacao = () => {
    setHistoricoTransformacoes((prev) => {
      if (prev.length === 0) return prev;
      const novoHistorico = [...prev];
      const ultima = novoHistorico.pop();
      if (ultima) {
        setPoints(ultima.pontosAnteriores); // dps que tu implementar ometodo das inversas tu tira essa porra
      }
      return novoHistorico;
    });
  };

  return (
    <PointsContext.Provider 
      value={{ 
        points, 
        historicoTransformacoes,
        addPoint, 
        removePoints, 
        aplicarTransformacoes,
        desfazerTransformacao
      }}
    >
      {children}
    </PointsContext.Provider>
  );
}
