import { useState } from "react";
import classnames from "classnames";
import disableDiode from "../images/disabledDiode.png";
import enabledDiode from "../images/enabledDiode.png";


interface IProps {
    index: number;
    name: string;
    status: boolean;
    stopCode: number[];
}

function Diode({index, name, status, stopCode} : IProps) {
  if(status === true){
    console.log("enabled", index);
  }
  let diode = status ? disableDiode : enabledDiode;

  return (
    <div className="flex justify-between my-2 border-b-2 border-indigo-200">
      <span className="text-2xl text-ellipsis overflow-hidden m-2">{index} - {name}</span>
      <img className="w-8 h-8 mx-2" src={diode} alt="Dioda"></img>
    </div>
  );
}

export default Diode;
