import Person from "../Person/Person";
import React, { Component } from "react";
import PropTypes from "prop-types";

class Persons extends Component {
  // since an initial state is not defined in this component
  // using this lifecycle hook is not recommended
  // static getDerivedStateFromProps(props, state) {
  //   console.log("[Persons.js] getDerivedStateFromProps");
  //   return state;
  // }

  // using shouldComponentUpdate() for optimization will avoid the component to render
  // unnecessary. It will only render when the props changed

  // In the case, you want to evaluate all the props of the component to decide if
  // the component should be rendered or not, the solution can be to extends a PureComponent class
  // class Persons extends PureComponent, this kind of component runs the shouldComponentUpdate()
  // lifecycle hook in automatic

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log("[Persons.js] shouldComponentUpdate");
    return nextProps.persons !== this.props.persons;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { message: "from snapshot" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate : snapshot", snapshot);
  }

  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }

  render() {
    console.log("[Persons.js] rendering ...");
    return this.props.persons.map((p, index) => {
      return (
        <Person
          name={p.name}
          age={p.age}
          key={p.id}
          click={() => this.props.clicked(index)}
          changed={(event) => this.props.changed(event, p.id)}
        >
          Children of {p.name}
        </Person>
      );
    });
  }
}

Person.propTypes = {
  clicked: PropTypes.func,
  changed: PropTypes.func,
  persons: PropTypes.array,
};

export default Persons;
