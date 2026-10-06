export type Vector = [x: number, y: number];

export type Matriz = Vector[];

export type Transformation = {
  rotation: number | null;
  scale: { sx: number; sy: number } | null;
  reflection: string | null;
};
