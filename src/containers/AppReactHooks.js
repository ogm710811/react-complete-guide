import React, { useState } from "react";
import "./App.css";
import Person from "./components/Person/Person";

const initialState = {
  persons: [
    { name: "orestes", age: "48" },
    { name: "blanca", age: "38" },
  ],
  kids: [
    { name: "venice", age: "4" },
    { name: "franco", age: "2" },
  ],
};

const app = (props) => {
  const [personState, setPersonState] = useState(initialState);
  const [kidState, setKidState] = useState(initialState);
  console.log(personState);

  const switchNameHandler = () => {
    setPersonState({
      persons: [
        { name: "Orestes Garcia", age: "58" },
        { name: "Blanca Gonzalez", age: "48" },
      ],
    });
  };

  return (
    <div className="App">
      <h1>React App</h1>
      <p>This is really working!!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person
        name={personState.persons[0].name}
        age={personState.persons[0].age}
      >
        My hobbies: soccer
      </Person>
      <Person
        name={personState.persons[1].name}
        age={personState.persons[1].age}
      />
      <Person name={kidState.kids[0].name} age={kidState.kids[0].age} />
      <Person name={kidState.kids[1].name} age={kidState.kids[1].age} />
    </div>
  );
};

export default app;
