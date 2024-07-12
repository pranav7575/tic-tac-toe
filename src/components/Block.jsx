import React from "react";
import './Block.css'

const Block = (props) => {
  return <div className="block" onClick={props.onClick}>
    {props.value}
  </div>;
};

export default Block;
