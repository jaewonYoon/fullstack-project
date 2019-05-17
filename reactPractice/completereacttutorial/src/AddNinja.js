import React, { Component } from "react";

class AddNinja extends Component {
  state = {
    name: null,
    age: null,
    belt: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addNinja(this.state);
  };
  render() {
    const stateValue = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" onChange={this.handleChange} /> <br />
          <label htmlFor="age">Age: </label>
          <input type="text" id="age" onChange={this.handleChange} /> <br />
          <label htmlFor="belt">Name:</label>
          <input type="text" id="belt" onChange={this.handleChange} /> <br />
          <button>onSubmit</button>
        </form>
        <hr />
        <p>{this.state.name}</p>
        <p>{this.state.age}</p>
        <p>{this.state.belt}</p>
      </div>
    );
  }
}

export default AddNinja;
