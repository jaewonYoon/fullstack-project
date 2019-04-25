import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
class App extends React.Component {
  //state initialize
  state = { lat: null, errorMessage: " " };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
    console.log("My component was rendered to the screen");
  }

  //helperfunction
  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      //seasonDisplay도 rerender된다.
      console.log(this.state.lat);
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="please accept location request" />;
  }

  //react says we have to define render
  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}
ReactDOM.render(<App />, document.querySelector("#root"));
