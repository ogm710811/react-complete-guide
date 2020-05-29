import React from "react";

import "./Person.css";
import Radium from "radium";

const person = (props) => {
  const clickStyle = {
    cursor: "pointer",
  };
  const mediaQueryStyle = {
    "@media (min-width: 750px)": {
      width: "450px",
    },
  };

  return (
    <div className="Person" style={mediaQueryStyle}>
      <p style={clickStyle} onClick={props.click}>
        I'm {props.name} and I'm {props.age}
      </p>
      <span>{props.children}</span>
      <br />
      <input type="text" onChange={props.changed} defaultValue={props.name} />
    </div>
  );
};

export default Radium(person);
