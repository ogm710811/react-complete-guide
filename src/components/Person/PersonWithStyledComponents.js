import React from "react";

import "./Person.css";
import Radium from "radium";
import styled from "styled-components";

const person = (props) => {
  const clickStyle = {
    cursor: "pointer",
  };
  const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
    @media (min-width: 750px): {
      width: "450px",
    },
  `;

  return (
    <StyledDiv>
      <p style={clickStyle} onClick={props.click}>
        I'm {props.name} and I'm {props.age}
      </p>
      <span>{props.children}</span>
      <br />
      <input type="text" onChange={props.changed} defaultValue={props.name} />
    </StyledDiv>
  );
};

export default person;
