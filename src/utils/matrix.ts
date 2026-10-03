import { Matriz } from "../types";

/**
 * Multiplica duas matrizes (A x B).
 * O número de colunas de A deve ser igual ao número de linhas de B.
 */
export const multiplicarMatrizes = (a: number[][], b: number[][]): number[][] => {
  const m = a.length;
  const n = a[0].length;
  const p = b[0].length;

  const resultado: number[][] = Array(m)
    .fill(0)
    .map(() => Array(p).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      for (let k = 0; k < n; k++) {
        resultado[i][j] += a[i][k] * b[k][j];
      }
    }
  }

  return resultado;
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
export const multiplicarPorEscalar = (m: number[][], escalar: number): number[][] => {
  return m.map((linha) => linha.map((val) => val * escalar));
};

/**
 * Função utilitária para aplicar uma matriz de transformação 2x2 aos pontos (Matriz N x 2).
 * Retorna no formato correto da tipagem "Matriz" da aplicação.
 */
export const transformarPontos = (pontos: Matriz, matrizTransformacao: Matriz): Matriz => {
  const resultado = multiplicarMatrizes(pontos, matrizTransformacao);
  // Garante que o retorno se enquadra na tipagem (Vector[])
  return resultado as Matriz;
};
