"use client"; 


import { usePoints } from "../context/PointsContext";

export default function PontoTrans() {
  

  const { addPoint } = usePoints();

  const ThrowError = (mensagem: any) => {
    alert("Ops, deu erro: " + mensagem);
  };

  const clicarNoBotao = () => {
    const pontoNovo = { x: 10, y: 10 };
    
    addPoint(pontoNovo, ThrowError);
  };

  return (
    <div className="p-4 border rounded-md">
      
    </div>
  );
}