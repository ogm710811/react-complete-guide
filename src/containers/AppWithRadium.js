import React, { Component } from "react";
import "./App.css";
import Person from "./components/Person/Person";
import Radium, { StyleRoot } from "radium";

class App extends Component {
  state = {
    persons: [
      { id: "dfvdfd", name: "orestes", age: "48" },
      { id: "fghhjn", name: "blanca", age: "38" },
    ],
    kids: [
      { id: "klklkl", name: "venice", age: "4" },
      { id: "lkujhy", name: "franco", age: "2" },
    ],
    displayPersons: false,
  };

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

    this.setState({
      persons: persons,
    });
  };

  displayPersonsHandler = () => {
    const persons = this.state.displayPersons;
    this.setState({ displayPersons: !persons });
  };

  deletePersonHandler = (personToDeleteIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personToDeleteIndex, 1);
    this.setState({
      persons: persons,
    });
  };

  render() {
    const buttonStyle = {
      backgroundColor: this.state.displayPersons ? "red" : "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      margin: "0 10px",
      ":hover": {
        backgroundColor: this.state.displayPersons ? "#ffc6c4" : "lightgreen",
        color: "black",
      },
    };

    const textClasses = [];
    let text = "Click button to display persons";
    if (this.state.displayPersons) {
      text = "Click on person to delete";
    }
    if (this.state.persons.length <= 1) {
      textClasses.push("red");
      text = "Only one Person left";
    }
    if (this.state.persons.length === 0) {
      textClasses.push("bold");
      text = "None Person left";
    }

    let persons = null;
    if (this.state.displayPersons) {
      persons = (
        <div>
          {this.state.persons.map((p, index) => {
            return (
              <Person
                name={p.name}
                age={p.age}
                key={p.id}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangedHandler(event, p.id)}
              />
            );
          })}
        </div>
      );
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>React App</h1>
          <p className={textClasses.join(" ")}>{text}</p>
          <div>
            <button style={buttonStyle} onClick={this.displayPersonsHandler}>
              Display Persons
            </button>
          </div>
          {persons}
        </div>
      </StyleRoot>
    );

    // return React.createElement(
    //   "div",
    //   { className: "App" },
    //   React.createElement("h1", null, "React App")
    // );
  }
}

export default Radium(App);
