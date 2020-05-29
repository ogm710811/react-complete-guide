import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import withCssClasses from "../../hoc/withCssClasses";
import PropTypes from "prop-types";
import AuthContext from "../../context/authContext/auth-context";

import personStyles from "./Person.css";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }
  static contextType = AuthContext;
  componentDidMount() {
    // after component renders using the reference on the input element
    // to get the focus
    // 1. Using the ref property (special React property) for the JSX element
    // this.inputElement.focus();

    // 2. Setting up the constructor using React.createRef() method
    this.inputElementRef.current.focus();
  }

  render() {
    console.log("[Person.js] rendering ...");
    const clickStyle = {
      cursor: "pointer",
    };
    // For rendering adjacent JSX elements you can
    // 1. create your own high order component (hoc), or
    // 2. use the built-in React.fragment component, or
    // 3. use a custom wrapper function that return a functional component, like below

    // Getting access to any html element in React you can have 2 approaches
    // 1. Using the ref property (special React property) for the JSX element => ref={(inputEl) => {inputEl.focus(); }}
    // 2. Setting up the constructor using React.createRef() method and passing it to the ref property
    return (
      <React.Fragment>
        <span>
          {this.context.isAuthenticated ? "Authenticated!!" : "Please, Log In"}
        </span>
        <p style={clickStyle} onClick={this.props.click}>
          I'm {this.props.name} and I'm {this.props.age}
        </p>
        <span>{this.props.children}</span>
        <br />
        <input
          type="text"
          // ref={(inputEl) => {
          //   this.inputElement = inputEl;
          // }}
          ref={this.inputElementRef}
          onChange={this.props.changed}
          defaultValue={this.props.name}
        />
      </React.Fragment>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  changed: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
};

export default withCssClasses(Person, personStyles.Person);
