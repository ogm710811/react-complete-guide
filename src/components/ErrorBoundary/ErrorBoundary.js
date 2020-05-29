import React, { Component } from "react";

class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: "",
  };

  errorCatchHandler = (errorMessage) => {
    this.setState({
      hasError: true,
      errorMessage: errorMessage,
    });
  };

  render() {
    return this.state.hasError ? (
      <h1>{this.state.errorMessage}</h1>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
