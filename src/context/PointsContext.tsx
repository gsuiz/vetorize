"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import type { Matriz, Vector, Transformation } from "../types";
import { calculateInverse, multiplyMatrices } from "../utils/matrix";

export const REFLECTION_MATRIX_X: Matriz = [
  [1, 0],
  [0, -1],
];
export const REFLECTION_MATRIX_Y: Matriz = [
  [-1, 0],
  [0, 1],
];
export const REFLECTION_MATRIX_ORIGIN: Matriz = [
  [-1, 0],
  [0, -1],
];

interface PointsProviderProps {
  children: ReactNode;
}

interface PointsContextType {
  points: Matriz;
  inversesStack: Matriz[];
  addPoint: (newPoint: Vector, setErr: (param: string) => void) => void;
  removePoints: (pointIndices: number[]) => void;
  applyTransformation: (transformation: Transformation) => void;
  undoTransformation: () => void;
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
  const [inversesStack, setInversesStack] = useState<Matriz[]>([]);

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

  const applyTransformation = (transformation: Transformation) => {
    if (points.length === 0) return;

    let newPoints = [...points];

    const transformationMatrices: Matriz[] = [];
    let transMtx: Matriz;

    if (transformation.scale) {
      const { sx, sy } = transformation.scale;

      transMtx = [
        [sx, 0],
        [0, sy],
      ];

      transformationMatrices.push(transMtx);
    }

    if (transformation.rotation) {
      const rad = transformation.rotation * (Math.PI / 180);

      transMtx = [
        [Math.cos(rad), Math.sin(rad)],
        [-Math.sin(rad), Math.cos(rad)],
      ];

      transformationMatrices.push(transMtx);
    }

    if (transformation.reflection) {
      let transMtx: Matriz;

      switch (transformation.reflection) {
        case "x":
          transMtx = REFLECTION_MATRIX_X;
          break;
        case "y":
          transMtx = REFLECTION_MATRIX_Y;
          break;
        default:
          transMtx = REFLECTION_MATRIX_ORIGIN;
      }

      transformationMatrices.push(transMtx);
    }

    transformationMatrices.forEach((matrix) => {
      newPoints = multiplyMatrices(newPoints, matrix) as Matriz;
    });

    setInversesStack((prev) => [
      ...prev,
      ...transformationMatrices.map((matrix) => calculateInverse(matrix)),
    ]);

    setPoints(newPoints);
  };

  const undoTransformation = () => {
    const lastInverseMatrix: Matriz = inversesStack.at(-1)!;

    const newPoints = multiplyMatrices(points, lastInverseMatrix) as Matriz;

    setInversesStack((prev) => prev.slice(0, -1));
    setPoints(newPoints);
  };

  return (
    <PointsContext.Provider
      value={{
        points,
        inversesStack,
        addPoint,
        removePoints,
        applyTransformation,
        undoTransformation,
      }}
    >
      {children}
    </PointsContext.Provider>
  );
}
