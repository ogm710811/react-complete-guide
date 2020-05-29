import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "../Person/Person";
import React from "react";

const persons = (props) => {
  console.log("[Persons.js] rendering ...");
  return props.persons.map((p, index) => {
    return (
      <ErrorBoundary key={p.id}>
        <Person
          name={p.name}
          age={p.age}
          click={() => props.clicked(index)}
          changed={(event) => props.changed(event, p.id)}
        />
      </ErrorBoundary>
    );
  });
};

export default persons;
