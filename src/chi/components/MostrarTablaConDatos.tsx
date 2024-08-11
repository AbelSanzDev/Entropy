interface ComponentesProbs {
  datosHoja: Record<string, any>[]; //Acepta string como any, el record es para saber si es el uno o el otro
}

const MostrarTablaConDatos: React.FC<ComponentesProbs> = ({ datosHoja }) => {
  // Función para determinar si una columna contiene solo 1, 2, 3
  const esColumnaNumerica = (valores: any[]) => {
    return valores.every((valor) => [1, 2, 3].includes(valor));
  };

  // Función para convertir los valores 1, 2, 3 en "Bajo", "Medio", "Alto"
  const convertirValor = (valor: any, esNumerico: boolean) => {
    if (!esNumerico) return valor;
    if (valor === 1) return "Bajo";
    if (valor === 2) return "Medio";
    if (valor === 3) return "Alto";
    return valor;
  };

  return (
    <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {Object.keys(datosHoja[0]).map((clave, index) => (
            <th
              key={index}
              className="border-b-2 border-gray-300 py-2 px-4 text-left text-sm font-semibold text-gray-700"
            >
              {clave}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {datosHoja.map((fila, index) => (
          <tr key={index} className="transition-all hover:bg-gray-50">
            {Object.entries(fila).map(([clave, valor], index) => {
              const columnaValores = datosHoja.map((f) => f[clave]);
              const esNumerico = esColumnaNumerica(columnaValores);
              return (
                <td key={index} className="py-2 px-4 whitespace-nowrap">
                  {convertirValor(valor, esNumerico)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MostrarTablaConDatos;
