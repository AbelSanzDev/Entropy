import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import MostrarTablaConDatos from "../components/MostrarTablaConDatos";
import { Button } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//*Interfaz de los datos que puede recibir por el excel y es puede recibir un objeto d llave tipo string con datos tipo string | number | boolean | null;
interface DatoHoja {
  [key: string]: string | number | boolean | null;
}
interface TablasInstacias {
  positivos: {
    valor1: number;
    valor2: number;
    valor3: number;
  };
  negativos: {
    valor1: number;
    valor2: number;
    valor3: number;
  };
  resultados: {
    res1: number;
    res2: number;
    res3: number;
    res4: number;
    res5: number;
  };
}
const ReadExcelFile = () => {
  //*En este useState se alamcenan todos los datos de la hoja de excel que se quiere ver
  const [datosHoja, setDatosHoja] = useState<DatoHoja[]>([]); //* puede contener un arreglo de cualquier tipo de datos
  //**Todos estos useStates son para poder llenar lo datos de las tablas */
  const [tabla1, setTabla1] = useState<TablasInstacias>({
    positivos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    negativos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    resultados: {
      res1: 0,
      res2: 0,
      res3: 0,
      res4: 0,
      res5: 0,
    },
  });
  const [tabla2, setTabla2] = useState<TablasInstacias>({
    positivos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    negativos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    resultados: {
      res1: 0,
      res2: 0,
      res3: 0,
      res4: 0,
      res5: 0,
    },
  });
  const [tabla3, setTabla3] = useState<TablasInstacias>({
    positivos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    negativos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    resultados: {
      res1: 0,
      res2: 0,
      res3: 0,
      res4: 0,
      res5: 0,
    },
  });
  const [tabla4, setTabla4] = useState<TablasInstacias>({
    positivos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    negativos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    resultados: {
      res1: 0,
      res2: 0,
      res3: 0,
      res4: 0,
      res5: 0,
    },
  });
  const [tabla5, setTabla5] = useState<TablasInstacias>({
    positivos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    negativos: {
      valor1: 0,
      valor2: 0,
      valor3: 0,
    },
    resultados: {
      res1: 0,
      res2: 0,
      res3: 0,
      res4: 0,
      res5: 0,
    },
  });

  const [claseValor, setClaseValor] = useState({
    positivo: 0,
    negativo: 0,
  });

  const [maxValue, setMaxValue] = useState<number>(0);

  const [divider, setDivider] = useState(0);

  //*Este use effect se utiliza para que cuando cambie el valor datosTablaContiugencia se compilen esas dos fuciones las cuales son la logica de todo el codigo

  //*leemos el excel con esta funcion
  const manejarCargaArchivo = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.name.split(".").pop()?.toLowerCase();
      if (fileType === "xlsx" || fileType === "xls") {
        readExcelFile(file);
      } else {
        alert("Unsupported file type");
      }
    }
  };
  const readExcelFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target?.result as string;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json<DatoHoja>(sheet);
      setDatosHoja(parsedData);
    };
    reader.readAsBinaryString(file);
  };

  //*Funcion para limiar toda la data
  const clearData = (): void => {
    setDatosHoja([]);
  };
  useEffect(() => {
    if (datosHoja.length === 0) return;
    handleGenerate();
  }, [datosHoja]);

  useEffect(() => {
    if (divider === 0) return;
    handleCreateTables();
  }, [divider]);

  //*Esta funcion es para poder hacer los datos en formato array
  const handleGenerate = () => {
    if (datosHoja.length === 0) return;

    const datos = Object.keys(datosHoja[1]);
    let newDatos: (string | number | boolean | null)[] = [];

    for (let j = 0; j < datos.length; j++) {
      for (let i = 0; i < datosHoja.length; i++) {
        newDatos.push(datosHoja[i][datos[j]]);
      }
    }

    const datonumero = Math.floor(newDatos.length / datos.length); // Asegúrate de que sea un número entero

    let secciones: (string | number | boolean | null)[][] = [];
    console.log(newDatos);

    for (let i = 0; i < 4; i++) {
      const inicio = i * datonumero;
      const fin = inicio + datonumero;
      const seccion = newDatos.slice(inicio, fin);
      secciones.push(seccion);
    }

    console.log(secciones);

    for (let i = 0; i < secciones[datos.length - 1].length; i++) {
      if (secciones[datos.length - 1][i] === 0) {
        console.log(secciones[datos.length - 1][i]);
      }
      if (secciones[datos.length - 1][i] === 1) {
        console.log(secciones[datos.length - 1][i]);
      }
    }
    //*Este for podria servir para poder hacer los calculos por separado sin la clase
    for (let i = 0; i < secciones.length - 1; i++) {
      for (let j = 0; j < secciones[i].length; j++) {
        const valor = secciones[i][j];
        console.log(valor);
        if (valor) {
          console.log("hola");
          if (/^< \d+$/.test(valor?.toString())) {
            console.log(valor);
          } else if (/^\d+ - \d+$/.test(valor?.toString())) {
            console.log(valor);
          } else if (/^> \d+$/.test(valor?.toString())) {
            console.log(valor);
          }
          if (valor === 1) {
            console.log(valor);
          }
          if (valor === 2) {
            console.log(valor);
          }
          if (valor === 3) {
            console.log(valor);
          }
        }
      }
    }
  };

  const handleCreateTables = () => {
    for (let i = 0; i < divider; i++) {}
  };

  return (
    <div className=" container mx-auto">
      <div className="my-5 fixed top-1 left-6">
        <Button size="lg" radius="full" color="danger" onClick={clearData}>
          Delete
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <div className="mt-5">
          <div className="mt-1 flex items-center justify-center px-6 pt-5 pb-6 border-2 border-blue-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                >
                  <span>Seleccionar archivo</span>
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={manejarCargaArchivo}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">xlsx, xls</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="my-5 text-5xl font-thin text-center">
            Datos del archivo Excel
          </h2>
          {datosHoja.length > 0 && (
            <div>
              <div>
                <div className="w-[50rem] h-[50rem] overflow-scroll">
                  <MostrarTablaConDatos datosHoja={datosHoja} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReadExcelFile;
