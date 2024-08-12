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
    let valores1 = {
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
    };
    let valores2 = {
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
    };
    let valores3 = {
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
    };
    let valores4 = {
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
    };
    let valores5 = {
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
    };

    let clase = {
      positivo: 0,
      negativo: 0,
    };
    for (let i = 0; i < secciones[datos.length - 1].length; i++) {
      if (secciones[datos.length - 1][i] === 0) {
        clase.negativo++;
      }
      if (secciones[datos.length - 1][i] === 1) {
        clase.positivo++;
      }
    }
    //*positivos contados
    console.log(clase);
    let resultadoClase: number = 0;
    const p11 = clase.positivo / (clase.positivo + clase.negativo);
    const p222 = clase.negativo / (clase.positivo + clase.negativo);
    //*Sacar resultados
    const log222 = (x: number) => Math.log(x) / Math.log(2);

    // Calcula la entropía
    resultadoClase = -(p11 * log222(p11) + p222 * log222(p222));
    console.log(resultadoClase);
    //*Este for podria servir para poder hacer los calculos por separado sin la clase

    for (let j = 0; j < secciones[0].length; j++) {
      if (secciones[0]) {
        const valor = secciones[0][j];

        // console.log(valor && secciones[datos.length - 1][j] === 0);
        if (valor) {
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores1.negativos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores1.negativos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores1.negativos.valor3++;
          }
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores1.positivos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores1.positivos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores1.positivos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 0) {
            valores1.negativos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 0) {
            valores1.negativos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 0) {
            valores1.negativos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 1) {
            valores1.positivos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 1) {
            valores1.positivos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 1) {
            valores1.positivos.valor3++;
          }
        }
      }
      console.log(valores1);
      if (secciones[1]) {
        const valor = secciones[1][j];
        console.log(valor);
        if (valor) {
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores2.negativos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores2.negativos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores2.negativos.valor3++;
          }
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores2.positivos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores2.positivos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores2.positivos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 0) {
            valores2.negativos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 0) {
            valores2.negativos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 0) {
            valores2.negativos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 1) {
            valores2.positivos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 1) {
            valores2.positivos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 1) {
            valores2.positivos.valor3++;
          }
        }
      }
      if (secciones[2]) {
        const valor = secciones[2][j];
        console.log(valor);
        if (valor) {
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores3.negativos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores3.negativos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores3.negativos.valor3++;
          }
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores3.positivos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores3.positivos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores3.positivos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 0) {
            valores3.negativos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 0) {
            valores3.negativos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 0) {
            valores3.negativos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 1) {
            valores3.positivos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 1) {
            valores3.positivos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 1) {
            valores3.positivos.valor3++;
          }
        }
      }
      if (secciones[3]) {
        const valor = secciones[3][j];
        console.log(valor);
        if (valor) {
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores4.negativos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores4.negativos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores4.negativos.valor3++;
          }
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores4.positivos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores4.positivos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores4.positivos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 0) {
            valores4.negativos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 0) {
            valores4.negativos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 0) {
            valores4.negativos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 1) {
            valores4.positivos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 1) {
            valores4.positivos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 1) {
            valores4.positivos.valor3++;
          }
        }
      }
      if (secciones[4]) {
        const valor = secciones[4][j];
        console.log(valor);
        if (valor) {
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores5.negativos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores5.negativos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 0
          ) {
            valores5.negativos.valor3++;
          }
          if (
            /^< \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores5.positivos.valor1++;
          }
          if (
            /^\d+ - \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores5.positivos.valor2++;
          }
          if (
            /^> \d+$/.test(valor?.toString()) &&
            secciones[datos.length - 1][j] === 1
          ) {
            valores5.positivos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 0) {
            valores5.negativos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 0) {
            valores5.negativos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 0) {
            valores5.negativos.valor3++;
          }
          if (valor === 1 && secciones[datos.length - 1][j] === 1) {
            valores5.positivos.valor1++;
          }
          if (valor === 2 && secciones[datos.length - 1][j] === 1) {
            valores5.positivos.valor2++;
          }
          if (valor === 3 && secciones[datos.length - 1][j] === 1) {
            valores5.positivos.valor3++;
          }
        }
      }
    }
    let resultadosFinales = {
      res1: 0,
      res2: 0,
      res3: 0,
      res4: 0,
      res5: 0,
    };
    setClaseValor({
      positivo: clase.positivo,
      negativo: clase.negativo,
    });

    let number = datos.length - 1;
    if (1 <= number) {
      const entropyResult1 = llenarTabla1(valores1, clase, resultadoClase, 1);
      resultadosFinales.res1 = entropyResult1;
    }
    if (2 <= number) {
      const entropyResult2 = llenarTabla1(valores2, clase, resultadoClase, 2);
      resultadosFinales.res2 = entropyResult2;
    }
    if (3 <= number) {
      const entropyResult3 = llenarTabla1(valores3, clase, resultadoClase, 3);
      resultadosFinales.res3 = entropyResult3;
    }
    if (4 < number) {
      const entropyResult4 = llenarTabla1(valores4, clase, resultadoClase, 4);
      resultadosFinales.res4 = entropyResult4;
    }
    if (5 < number) {
      const entropyResult5 = llenarTabla1(valores5, clase, resultadoClase, 5);
      resultadosFinales.res5 = entropyResult5;
    }

    console.log(resultadosFinales);
    const maxValue = Math.max(...Object.values(resultadosFinales)).toFixed(2);
    setMaxValue(parseFloat(maxValue));
  };

  const llenarTabla1 = (
    valores1: any,
    clase: any,
    resultadoClase: any,
    valor: number
  ): number => {
    const p1 =
      valores1.positivos.valor1 /
      (valores1.positivos.valor1 + valores1.negativos.valor1);
    const p2 =
      valores1.negativos.valor1 /
      (valores1.positivos.valor1 + valores1.negativos.valor1);
    //*Sacar resultados
    const log2 = (x: number) => Math.log(x) / Math.log(2);

    // Calcula la entropía
    let resultadoFila1 = -(p1 * log2(p1) + p2 * log2(p2));

    if (isNaN(resultadoFila1)) resultadoFila1 = 0;
    console.log(resultadoFila1);
    const p21 =
      valores1.positivos.valor2 /
      (valores1.positivos.valor2 + valores1.negativos.valor2);
    const p22 =
      valores1.negativos.valor2 /
      (valores1.positivos.valor2 + valores1.negativos.valor2);
    //*Sacar resultados
    const log22 = (x: number) => Math.log(x) / Math.log(2);

    // Calcula la entropía
    let resultadoFila2 = -(p21 * log22(p21) + p22 * log22(p22));
    if (isNaN(resultadoFila2)) resultadoFila2 = 0;
    console.log(resultadoFila2);

    const p31 =
      valores1.positivos.valor3 /
      (valores1.positivos.valor3 + valores1.negativos.valor3);
    const p32 =
      valores1.negativos.valor3 /
      (valores1.positivos.valor3 + valores1.negativos.valor3);
    //*Sacar resultados
    const log32 = (x: number) => Math.log(x) / Math.log(2);

    // Calcula la entropía
    let resultadoFila3 = -(p31 * log32(p31) + p32 * log32(p32));
    if (isNaN(resultadoFila3)) resultadoFila3 = 0;
    // setTabla1(valores);
    const entropyResult1 =
      resultadoClase -
      (((valores1.positivos.valor1 + valores1.negativos.valor1) /
        (clase.positivo + clase.negativo)) *
        resultadoFila1 +
        ((valores1.positivos.valor2 + valores1.negativos.valor2) /
          (clase.positivo + clase.negativo)) *
          resultadoFila2 +
        ((valores1.positivos.valor3 + valores1.negativos.valor3) /
          (clase.positivo + clase.negativo)) *
          resultadoFila3);
    console.log(entropyResult1);
    switch (valor) {
      case 1:
        setTabla1({
          positivos: {
            valor1: valores1.positivos.valor1,
            valor2: valores1.positivos.valor2,
            valor3: valores1.positivos.valor3,
          },
          negativos: {
            valor1: valores1.negativos.valor1,
            valor2: valores1.negativos.valor2,
            valor3: valores1.negativos.valor3,
          },
          resultados: {
            res1: entropyResult1,
            res2: resultadoFila1,
            res3: resultadoFila2,
            res4: resultadoFila3,
            res5: resultadoClase,
          },
        });
        break;

      case 2:
        setTabla2({
          positivos: {
            valor1: valores1.positivos.valor1,
            valor2: valores1.positivos.valor2,
            valor3: valores1.positivos.valor3,
          },
          negativos: {
            valor1: valores1.negativos.valor1,
            valor2: valores1.negativos.valor2,
            valor3: valores1.negativos.valor3,
          },
          resultados: {
            res1: entropyResult1,
            res2: resultadoFila1,
            res3: resultadoFila2,
            res4: resultadoFila3,
            res5: resultadoClase,
          },
        });
        break;
      case 3:
        setTabla3({
          positivos: {
            valor1: valores1.positivos.valor1,
            valor2: valores1.positivos.valor2,
            valor3: valores1.positivos.valor3,
          },
          negativos: {
            valor1: valores1.negativos.valor1,
            valor2: valores1.negativos.valor2,
            valor3: valores1.negativos.valor3,
          },
          resultados: {
            res1: entropyResult1,
            res2: resultadoFila1,
            res3: resultadoFila2,
            res4: resultadoFila3,
            res5: resultadoClase,
          },
        });
        break;
      case 4:
        setTabla4({
          positivos: {
            valor1: valores1.positivos.valor1,
            valor2: valores1.positivos.valor2,
            valor3: valores1.positivos.valor3,
          },
          negativos: {
            valor1: valores1.negativos.valor1,
            valor2: valores1.negativos.valor2,
            valor3: valores1.negativos.valor3,
          },
          resultados: {
            res1: entropyResult1,
            res2: resultadoFila1,
            res3: resultadoFila2,
            res4: resultadoFila3,
            res5: resultadoClase,
          },
        });
        break;
      case 5:
        setTabla5({
          positivos: {
            valor1: valores1.positivos.valor1,
            valor2: valores1.positivos.valor2,
            valor3: valores1.positivos.valor3,
          },
          negativos: {
            valor1: valores1.negativos.valor1,
            valor2: valores1.negativos.valor2,
            valor3: valores1.negativos.valor3,
          },
          resultados: {
            res1: entropyResult1,
            res2: resultadoFila1,
            res3: resultadoFila2,
            res4: resultadoFila3,
            res5: resultadoClase,
          },
        });
        break;
    }
    return entropyResult1;
  };

  const todosSonCero = (obj: Record<string, any>): boolean => {
    return Object.values(obj).every((valor) => valor === 0);
  };

  console.log(tabla4);

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

          <div className="grid grid-cols-2 mt-5 gap-[1rem]">
            {datosHoja.length > 0 && (
              <div className="">
                <div>
                  <h1 className="text-2xl underline">
                    {Object.keys(datosHoja[0])[0]}
                  </h1>
                </div>
                {tabla1 && (
                  <div>
                    <table
                      className={`min-w-full my-6   ${
                        parseFloat(tabla1.resultados.res1.toFixed(2)) ===
                        maxValue
                          ? "divide-y-4 divide-yellow-500"
                          : "divide-y divide-gray-600"
                      }  `}
                    >
                      <thead
                        className={` ${
                          parseFloat(tabla1.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-200"
                            : "bg-white"
                        } `}
                      >
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Positivos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negativos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resultados
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          parseFloat(tabla1.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-100"
                            : "bg-white"
                        }  divide-y divide-gray-200`}
                      >
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.positivo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.negativo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res5.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.positivos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.negativos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res2.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.positivos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.negativos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res3.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res4.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res1.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {datosHoja.length > 0 && (
              <div className="">
                <div>
                  <h1 className="text-2xl underline">
                    {Object.keys(datosHoja[0])[1]}
                  </h1>
                </div>
                {todosSonCero(tabla2.resultados) ? null : (
                  <div>
                    <table
                      className={`min-w-full my-6   ${
                        parseFloat(tabla2.resultados.res1.toFixed(2)) ===
                        maxValue
                          ? "divide-y-4 divide-yellow-500"
                          : "divide-y divide-gray-600"
                      }  `}
                    >
                      <thead
                        className={` ${
                          parseFloat(tabla2.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-200"
                            : "bg-white"
                        } `}
                      >
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Positivos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negativos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resultados
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          parseFloat(tabla2.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-100"
                            : "bg-white"
                        }  divide-y divide-gray-200`}
                      >
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.positivo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.negativo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res5.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.positivos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.negativos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.resultados.res2.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.positivos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.negativos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.resultados.res3.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.resultados.res4.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla2.resultados.res1.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {datosHoja.length > 0 && (
              <div className="">
                <div>
                  <h1 className="text-2xl underline">
                    {Object.keys(datosHoja[0])[2]}
                  </h1>
                </div>
                {todosSonCero(tabla3) ? null : (
                  <div>
                    <table
                      className={`min-w-full my-6   ${
                        parseFloat(tabla3.resultados.res1.toFixed(2)) ===
                        maxValue
                          ? "divide-y-4 divide-yellow-500"
                          : "divide-y divide-gray-600"
                      }  `}
                    >
                      <thead
                        className={` ${
                          parseFloat(tabla3.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-200"
                            : "bg-white"
                        } `}
                      >
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Positivos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negativos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resultados
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          parseFloat(tabla3.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-100"
                            : "bg-white"
                        }  divide-y divide-gray-200`}
                      >
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.positivo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.negativo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla1.resultados.res5.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.positivos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.negativos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.resultados.res2.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.positivos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.negativos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.resultados.res3.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.resultados.res4.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla3.resultados.res1.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {datosHoja.length > 0 && (
              <div className="">
                {todosSonCero(tabla4.resultados) ? null : (
                  <div>
                    <h1 className="text-2xl underline">
                      {Object.keys(datosHoja[0])[3]}
                    </h1>
                  </div>
                )}

                {todosSonCero(tabla4.resultados) ? null : (
                  <div>
                    <table
                      className={`min-w-full my-6   ${
                        parseFloat(tabla4.resultados.res1.toFixed(2)) ===
                        maxValue
                          ? "divide-y-4 divide-yellow-500"
                          : "divide-y divide-gray-600"
                      }  `}
                    >
                      <thead
                        className={` ${
                          parseFloat(tabla4.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-200"
                            : "bg-white"
                        } `}
                      >
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Positivos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negativos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resultados
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          parseFloat(tabla4.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-100"
                            : "bg-white"
                        }  divide-y divide-gray-200`}
                      >
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.positivo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.negativo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.resultados.res5.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.positivos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.negativos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.resultados.res2.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.positivos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.negativos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.resultados.res3.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.resultados.res4.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla4.resultados.res1.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {datosHoja.length > 0 && (
              <div className="">
                {todosSonCero(tabla5.resultados) ? null : (
                  <div>
                    <h1 className="text-2xl underline">
                      {Object.keys(datosHoja[0])[4]}
                    </h1>
                  </div>
                )}
                {todosSonCero(tabla5.resultados) ? null : (
                  <div>
                    <table
                      className={`min-w-full my-6   ${
                        parseFloat(tabla5.resultados.res1.toFixed(2)) ===
                        maxValue
                          ? "divide-y-4 divide-yellow-500"
                          : "divide-y divide-gray-600"
                      }  `}
                    >
                      <thead
                        className={` ${
                          parseFloat(tabla5.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-200"
                            : "bg-white"
                        } `}
                      >
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Positivos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Negativos
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Resultados
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        className={`${
                          parseFloat(tabla5.resultados.res1.toFixed(2)) ===
                          maxValue
                            ? "bg-yellow-100"
                            : "bg-white"
                        }  divide-y divide-gray-200`}
                      >
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.positivo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {claseValor.negativo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.resultados.res5.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.positivos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.negativos.valor1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.resultados.res2.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.positivos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.negativos.valor2}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.resultados.res3.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.resultados.res4.toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.positivos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.negativos.valor3}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {tabla5.resultados.res1.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
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
