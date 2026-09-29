"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import type { Points, Point } from "../types";

interface PointsContextType {
  points: Points;
  addPoint: (newPoint: Point, setErr: (param: string) => void) => void;
  removePoints: (pointIndices: number[]) => void;
}

interface PointsProviderProps {
  children: ReactNode;
}

const PointsContext = createContext<PointsContextType | null>(null);

const sumPoints = (param: number[]) => {
  return param.reduce((acc, item) => (acc += item), 0);
};

const includesPoint = (currentPoints: Points, newPoint: Point): boolean => {
  return currentPoints.some(({ x, y }) => {
    return x === newPoint.x && y === newPoint.y;
  });
};

const organizePoints = (newPoints: Points) => {
  const xCoord: number[] = newPoints.map((item) => item.x);
  const yCoord: number[] = newPoints.map((item) => item.y);

  const length = xCoord.length;

  const center = (sumPoints(xCoord) / length, sumPoints(yCoord) / length);

  const pointsWithAngle = xCoord.map((item, index) => {
    const deltaX: number = item - center;
    const deltaY: number = yCoord[index] - center;

    const angle = Math.atan2(deltaY, deltaX);

    return { x: item, y: yCoord[index], angle };
  });

  const orderedByAngle = pointsWithAngle.sort((a, b) => a.angle - b.angle);

  return orderedByAngle.map((item) => ({
    x: item.x,
    y: item.y,
  }));
};

export function usePoints() {
  const context = useContext(PointsContext);

  if (!context) {
    throw new Error("ERROR IN CONTEXT");
  }

  return context;
}

export default function PointsProvider({ children }: PointsProviderProps) {
  const [points, setPoints] = useState<Points>([]);

  const addPoint = (newPoint: Point, setErr: (param: string) => void) => {
    if (!includesPoint(points, newPoint)) {
      let newPoints: Points = [...points, newPoint];

      if (newPoints.length >= 3) {
        newPoints = organizePoints(newPoints);
      }

      setPoints(newPoints);
    } else {
      setErr("Ponto já adicionado.");
    }
  };

  const removePoints = (pointsIndices: number[]) => {
    setPoints((prev: Points) =>
      prev.filter((_, index) => !pointsIndices.includes(index)),
    );
  };

  return (
    <PointsContext.Provider value={{ points, addPoint, removePoints }}>
      {children}
    </PointsContext.Provider>
  );
}
