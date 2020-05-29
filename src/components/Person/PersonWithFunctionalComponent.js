import React from "react";

import personStyles from "./Person.css";

const person = (props) => {
  console.log("[Person.js] rendering ...");
  const clickStyle = {
    cursor: "pointer",
  };
  return (
    <div className={personStyles.Person}>
      <p style={clickStyle} onClick={props.click}>
        I'm {props.name} and I'm {props.age}
      </p>
      <span>{props.children}</span>
      <br />
      <input type="text" onChange={props.changed} defaultValue={props.name} />
    </div>
  );
};

export default person;
