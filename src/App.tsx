import React, { useEffect, useState } from "react";
import Diode from "./components/Diode";
import { lines } from "./utils/lines";
import axios from "axios";

function App() {
  const [variables, setVariables] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get("http://localhost:9999/").then((res) => {
        setVariables(res.data);
      });
    }, 1000);

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

  return (
    <div>
      <header className="max-sm:m-10 sm:m-20 max-sm:p-5 sm:p-10 bg-gray-200 rounded-xl shadow-md">
        <h1 className="text-center text-3xl m-4">SnapLine - Web</h1>
        {renderDiode}
      </header>
    </div>
  );
}

export default App;
