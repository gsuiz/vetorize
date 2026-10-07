export type Vector = [x: number, y: number];

export type Matrix = Vector[];

export type Transformation = {
  rotation: number | null;
  scale: { sx: number; sy: number } | null;
  reflection: string | null;
  anchor: [x: number, y: number] | null;
};
