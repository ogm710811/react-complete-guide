import React, { Component } from "react";
import "./App.css";
import Person from "./components/Person/Person";

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

  nameChangedHandler = (event) => {
    this.setState({
      kids: [
        { name: event.target.value, age: "4" },
        { name: "franco", age: "2" },
      ],
    });
  };

  displayPersonsHandler = () => {
    const persons = this.state.displayPersons;
    this.setState({ displayPersons: !persons });
  };

  render() {
    const buttonStyle = {
      backgroundColor: "white",
      color: "blue",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      margin: "0 10px",
    };

    let persons = null;
    if (this.state.displayPersons) {
      persons = (
        <div>
          <Person
            name={this.state.persons[0].name}
            age={this.state.persons[0].age}
          >
            My hobbies: soccer
          </Person>
          <Person
            name={this.state.persons[1].name}
            age={this.state.persons[1].age}
            // passing methods reference using bind()
            click={this.switchNameHandler.bind(
              this,
              "Orestico!!!",
              "Blanquita!!!"
            )}
          />
          <Person
            name={this.state.kids[0].name}
            age={this.state.kids[0].age}
            // adding 2 way binding : this changes the state of kids
            changed={this.nameChangedHandler}
          />
          <Person name={this.state.kids[1].name} age={this.state.kids[1].age} />
        </div>
      );
    }

    return (
      <div className="App">
        <h1>React App</h1>
        <p>This is really working!!</p>
        <div>
          <button
            style={buttonStyle}
            // passing methods reference using arrow function
            onClick={(event) =>
              this.switchNameHandler("Orestes Garcia", "Blanca Gonzalez")
            }
          >
            Switch Name
          </button>
          <button style={buttonStyle} onClick={this.displayPersonsHandler}>
            Display Persons
          </button>
        </div>
        {persons}
      </div>
    );

    // return React.createElement(
    //   "div",
    //   { className: "App" },
    //   React.createElement("h1", null, "React App")
    // );
  }
}

export default App;
