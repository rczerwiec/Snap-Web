import React, { useEffect, useState } from "react";
import Diode from "./components/Diode";
import { lines } from "./utils/lines";
import axios from "axios";
import RingLoader from "react-spinners/RingLoader";
import {motion} from "framer-motion";



function App() {
  const [variables, setVariables] = useState<number[]>([]);
  const [isError, setIsError] = useState<number>(0); //0 - loading, 1 - error, 2 - success

  const getData = () => {
    axios.get(process.env.REACT_APP_BACKEND_URL!).then((res) => {
      setVariables(res.data);
      setIsError(2);
    }).catch((err) => {
      setIsError(1);
    });
  }

  useEffect(() => {
    getData();

    const interval = setInterval(() => {
      getData();
    }, parseInt(process.env.REACT_APP_TIMER!));

    return () => clearInterval(interval);
  },[]);

  const renderDiode = lines.map((_, i) => {
    let returned;
    variables.forEach((line) => {
      _.stopCode.forEach((x) => {
        if (x === line) {
          returned = (
            <Diode
              name={_.name}
              stopCode={_.stopCode}
              index={_.id}
              status={true}
              key={i}
            />
          );
        }
      });
    });
    if (returned === undefined) {
      return (
        <Diode
          name={_.name}
          stopCode={_.stopCode}
          index={_.id}
          status={false}
          key={i}
        />
      );
    } else {
      return returned;
    }
  });
  const error = <div className="text-2xl text-center text-red-500 font-bold">Błąd podczas łączenia z backendem</div>

  return (
    <div className="flex h-screen">
      <motion.div initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 2,
            delay: 0.2,
            ease: [0, 0.71, 0.2, 1.01],
          }} className="max-sm:mx-40 sm:mx-40 max-sm:p-5 sm:p-10 bg-gray-200 rounded-xl m-10 w-screen overflow-y-scroll">
                          <h1 className="text-center text-3xl m-4">SnapLine - Web</h1>
        {isError === 1 && error}
        {isError === 0 && <div className="flex flex-col justify-center items-center"><RingLoader  color="#000" size={150}/> Ładowanie </div>}
        {isError === 2 && renderDiode}
      </motion.div>
    </div>
  );
}

export default App;
