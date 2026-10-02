export type Vector = [x: number, y: number];

export type Matriz = Vector[];

export type Transformacoes = {
  rotacao: { angulo: number } | null;
  escala: { sx: number; sy: number } | null;
  reflexao: { eixo: string } | null;
};