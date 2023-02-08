import React, { useEffect, useState } from "react";
import Diode from "./components/Diode";
import { lines } from "./utils/lines";

function App() {
  const codeFromBackend: number[] = [16777216, 512]; //To będzie szło z backendu
  const [variables, setVariables] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVariables(codeFromBackend);
      console.log("hi");
    }, 1000);

    return () => clearInterval(interval);
  },[]);

  const renderDiode = lines.map((_, i) => {
    let returned;
    codeFromBackend.forEach((line) => {
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

  return (
    <div>
      <header className="max-sm:m-10 sm:m-20 max-sm:p-5 sm:p-10 bg-gray-200 rounded-xl shadow-md">
        {variables}
        <h1 className="text-center text-3xl m-4">SnapLine - Web</h1>
        {renderDiode}
      </header>
    </div>
  );
}

export default App;
