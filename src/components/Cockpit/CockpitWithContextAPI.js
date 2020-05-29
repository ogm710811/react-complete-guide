import React, { useContext, useEffect, useRef } from "react";
import appStyles from "../../containers/App.css";
import cockpitStyles from "./Cockpit.css";
import AuthContext from "../../context/authContext/auth-context";

const cockpit = (props) => {
  // accessing JSX element reference in functional components
  const buttonElementRef = useRef();

  useEffect(() => {
    console.log("[Cockpit.js] useEffect");
    // here you can make Http request ...
    // how to control when useEffect triggers?
    // example with a setTimeout()
    // the second arg is an array of the dependencies which changes
    // makes to trigger the alert (http request)
    setTimeout(() => {
      alert("Http request");
    }, 1000);
  }, [props.persons]);

  useEffect(() => {
    // getting the reference to the button and triggering some actions
    buttonElementRef.current.click();
  }, []);

  // how to use componentDidMount() lifecycle in a functional component?
  // to do something similar to componentDidMount() means trigger the alert when component renders
  // the first time. *** passing an empty array in the dependencies of the useEffect hook.

  // useEffect(() => {
  //   console.log("[Cockpit.js] useEffect no dependencies");
  //   setTimeout(() => {
  //     alert("Http request");
  //   }, 1000);
  // }, []);

  // how to use componentWillUnmount lifecycle in a functional component to clean up work?
  // returning an anonymous function. The returning function runs BEFORE the main useEffect function runs,
  // but after the first render cycle

  useEffect(() => {
    return () => {
      console.log("[Cockpit.js] cleanup work in useEffect");
    };
  }, []);

  const textClasses = [];
  const buttonClasses = [];
  let text = "Click button to display persons";
  if (props.displayPersons) {
    text = "Click on person to delete";
    buttonClasses.push(cockpitStyles.Red);
  }
  if (props.personsLength <= 1) {
    textClasses.push(appStyles.red);
    text = "Only one Person left";
  }
  if (props.personsLength === 0) {
    textClasses.push(appStyles.bold);
    text = "None Person left";
  }

  return (
    <div className={cockpitStyles.Cockpit}>
      <h1>{props.appTitle}</h1>
      <AuthContext.Consumer>
        {(context) => (
          <button
            className={
              context.isAuthenticated
                ? cockpitStyles.Red
                : cockpitStyles.Cockpit
            }
            onClick={() => context.login()}
          >
            {context.isAuthenticated ? "Logout" : "Login"}
          </button>
        )}
      </AuthContext.Consumer>
      <p className={textClasses.join(" ")}>{text}</p>
      <div>
        <button
          className={buttonClasses.join(" ")}
          onClick={props.clicked}
          ref={buttonElementRef}
        >
          Display Persons
        </button>
      </div>
    </div>
  );
};

// React.memo is used for optimization. The children component (Cockpit component)
// only will render when its parent component properties changed.
// React.memo is ONLY used in functional components.
// For class based components we use the shouldComponentUpdate() lifecycle hook
export default React.memo(cockpit);
