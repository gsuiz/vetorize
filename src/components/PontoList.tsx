import { Matriz } from "@/src/types/matriz"

interface PointListProps {
  matriz: Matriz;
}

export default function PontoList({ matriz }: PointListProps) {
  if (matriz.length === 0) return null;

  return (
    <div className="mb-6 flex flex-col gap-2">
      <h3 className="text-sm font-semibold opacity-70">Pontos registrados:</h3>
      {matriz.map((p, index) => (
        <div key={index} className="flex gap-4 items-center p-2 rounded border">
          <span>Ponto {index + 1}:</span>
          <span className="font-mono">x: {p.x}</span>
          <span className="font-mono">y: {p.y}</span>
        </div>
      ))}
    </div>
  );
}