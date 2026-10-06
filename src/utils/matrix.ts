import { Matriz } from "../types";

/**
 * Multiplica duas matrizes (A x B).
 * O número de colunas de A deve ser igual ao número de linhas de B.
 */
export const multiplyMatrices = (
  a: number[][],
  b: number[][],
): number[][] => {
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
 * Soma duas matrizes (A + B).
 * As matrizes devem ter exatamente as mesmas dimensões.
 */
export const somarMatrizes = (a: number[][], b: number[][]): number[][] => {
  return a.map((linha, i) => linha.map((val, j) => val + b[i][j]));
};

/**
 * Multiplica uma matriz por um valor escalar.
 */
export const multiplicarPorEscalar = (
  m: number[][],
  escalar: number,
): number[][] => {
  return m.map((linha) => linha.map((val) => val * escalar));
};

/**
 * Função utilitária para calcular a inversa de uma matriz 2x2.
 * @param matrix 
 *
 */
export const calculateInverse = (matrix: Matriz): Matriz => {
  const lines: number = matrix.length;
  const columns: number = matrix[0].length;

  // gera a matriz de identidade
  // const identity: number[][] = [...Array(lines)].map((_, lineIndex) =>
  //   [...Array(columns)].map((_, columnIndex) =>
  //     lineIndex === columnIndex ? 1 : 0,
  //   ),
  // );

  // Os elementos da diagonal principal tem suas posições trocadas
  const aux: number = matrix[0][0]
  matrix[0][0] = matrix[lines - 1][columns - 1]
  matrix[columns - 1][lines - 1] = aux

  // A diagonal secundária é multiplicada por -1
  matrix[0][columns - 1] *= -1
  matrix[lines - 1][0] *= -1

  const det: number =
    matrix[0][0] * matrix[lines - 1][columns - 1] -
    matrix[0][columns - 1] * matrix[lines - 1][0];

  const inverseMatrix = matrix.map((line: [number, number]) =>
    line.map((item: number) => item / det),
  );

  return inverseMatrix as Matriz;
};
