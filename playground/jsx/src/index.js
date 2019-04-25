// Import the React and ReactDOM Libraries
import React from "react";
import ReactDOM from "react-dom";

function getfunctionText() {
  return "Click on Me!";
}
// create a react component
const App = function() {
  const buttonObject = { text: "Click Me!" };
  const buttonText = "Click Me!";
  const style = { backgroundColor: "blue", color: "white" };
  return (
    <div>
      <label className="label" htmlFor="name">
        Enter name:
      </label>
      <input id="name" type="text" />
      <button style={style}>{buttonObject.text}</button>
    </div>
  );
};
// Take the react component and show it on the screen
ReactDOM.render(<App />, document.querySelector("#root"));
