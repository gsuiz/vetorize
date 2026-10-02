"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import type { Matriz, Vector } from "../types";

interface PointsContextType {
  points: Matriz;
  addPoint: (newPoint: Vector, setErr: (param: string) => void) => void;
  removePoints: (pointIndices: number[]) => void;
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

  return (
    <PointsContext.Provider value={{ points, addPoint, removePoints }}>
      {children}
    </PointsContext.Provider>
  );
}
