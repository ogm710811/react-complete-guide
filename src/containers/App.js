import React, { Component } from "react";
import appStyles from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import styled from "styled-components";
import Aux from "../hoc/Auxiliary";
import withCssClasses from "../hoc/withCssClasses";
import AuthContext from "../context/authContext/auth-context";

const StyledButton = styled.button`
  background-color: green;
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;
  margin: 10px 10px;
  &:hover {
    background-color: lightgreen;
    color: black;
  },
`;

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "dfvdfd", name: "orestes", age: 48 },
      { id: "fghhjn", name: "blanca", age: 38 },
    ],
    displayCockpit: true,
    displayPersons: false,
    nameChangeCounter: 0,
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[App.js] getSnapshotBeforeUpdate");
    return { message: "from App.js" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[App.js] componentDidUpdate : snapshot", snapshot);
  }

  switchNameHandler = (newNameHim, newNameHer) => {
    // NEVER DO THIS: this.state.persons[0] = 'Orestes';

    this.setState({
      persons: [
        { name: newNameHim, age: "58" },
        { name: newNameHer, age: "48" },
      ],
    });
  };

  nameChangedHandler = (event, personId) => {
    const foundPersonIndex = this.state.persons.findIndex(
      (p) => p.id === personId
    );
    const person = {
      ...this.state.persons[foundPersonIndex],
    };
    // alternative approach to copy an Object using Object.assign()
    // const person = Object.assign({}, this.state.persons[foundPersonIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[foundPersonIndex] = person;

    // this is NOT the right way to update the state.
    // this way cannot guaranty we are using the last updated state
    // remember that at the same time state can be updated in different
    // parts of the app, so we need a way to get the last updated state
    this.setState({
      persons: persons,
      nameChangeCounter: this.state.nameChangeCounter + 1,
    });

    // HERE .. the right way to update state
    this.setState((prevState, props) => {
      return {
        persons: persons,
        nameChangeCounter: prevState.nameChangeCounter + 1,
      };
    });
  };

  displayPersonsHandler = () => {
    const persons = this.state.displayPersons;
    this.setState({ displayPersons: !persons });
  };

  displayCockpitHandler = () => {
    const displayCockpit = this.state.displayCockpit;
    this.setState({ displayCockpit: !displayCockpit });
  };

  deletePersonHandler = (personToDeleteIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personToDeleteIndex, 1);
    this.setState({
      persons: persons,
    });
  };

  loginHandler = () => {
    const isAuth = this.state.isAuthenticated;
    this.setState({
      isAuthenticated: !isAuth,
    });
  };

  render() {
    console.log("[App.js] render");

    let persons = null;
    if (this.state.displayPersons) {
      persons = (
        <Persons
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
          persons={this.state.persons}
        />
      );
    }

    return (
      <Aux>
        <StyledButton onClick={this.displayCockpitHandler}>
          Display Cockpit
        </StyledButton>
        {/*IMPORTANT!!! the context API component must wrap those component*/}
        {/*that will consume it*/}
        <AuthContext.Provider
          value={{
            isAuthenticated: this.state.isAuthenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.displayCockpit ? (
            <Cockpit
              appTitle={this.props.appTitle}
              displayPersons={this.state.displayPersons}
              personsLength={this.state.persons.length}
              clicked={this.displayPersonsHandler}
            ></Cockpit>
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withCssClasses(App, appStyles.App);
