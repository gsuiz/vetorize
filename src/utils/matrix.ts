import { Matrix, Vector } from "../types";
import { isMatrix } from "./validators";


export const multiplyMatrices = (a: number[][], b: number[][]): number[][] => {
  const m = a.length;
  const n = a[0].length;
  const p = b[0].length;

  const result: number[][] = Array(m)
    .fill(0)
    .map(() => Array(p).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < n; k++) {
        result[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return result;
};

/**
 * @param currentPoints
 * @param transformationMatrices
 * @param anchorPoint
 *
 */

export const transformPointsAroundAnchor = (
  currentPoints: Matrix,
  transformationMatrices: Matrix | Matrix[],
  anchorPoint: Vector,
): Matrix => {

  
  let newPoints = currentPoints.map(([x, y]) => [
    x - anchorPoint[0],
    y - anchorPoint[1],
  ]) as Matrix;

  if (isMatrix(transformationMatrices)) {
    newPoints = multiplyMatrices(newPoints, transformationMatrices) as Matrix;
  } else {
    transformationMatrices.forEach((matrix) => {
      newPoints = multiplyMatrices(newPoints, matrix) as Matrix;
    });
  }

  newPoints = newPoints.map(([x, y]) => [
    x + anchorPoint[0],
    y + anchorPoint[1],
  ]);

  return newPoints;
};


export const somarMatrizes = (a: number[][], b: number[][]): number[][] => {
  return a.map((linha, i) => linha.map((val, j) => val + b[i][j]));
};


export const multiplicarPorEscalar = (
  m: number[][],
  escalar: number,
): number[][] => {
  return m.map((linha) => linha.map((val) => val * escalar));
};

/**
 * @param matrix
 *
 */
export const calculateInverse = (matrix: Matrix): Matrix => {
  const lines: number = matrix.length;
  const columns: number = matrix[0].length;

  // gera a matriz de identidade
  // const identity: number[][] = [...Array(lines)].map((_, lineIndex) =>
  //   [...Array(columns)].map((_, columnIndex) =>
  //     lineIndex === columnIndex ? 1 : 0,
  //   ),
  // );

  const mtx: Matrix = matrix.map((row) => [...row]);

  const aux: number = mtx[0][0];
  mtx[0][0] = mtx[lines - 1][columns - 1];
  mtx[columns - 1][lines - 1] = aux;

  mtx[0][columns - 1] *= -1;
  mtx[lines - 1][0] *= -1;

  const det: number =
    mtx[0][0] * mtx[lines - 1][columns - 1] -
    mtx[0][columns - 1] * mtx[lines - 1][0];

  const inverseMatrix = mtx.map((line: [number, number]) =>
    line.map((item: number) => item / det),
  );

  return inverseMatrix as Matrix;
};
