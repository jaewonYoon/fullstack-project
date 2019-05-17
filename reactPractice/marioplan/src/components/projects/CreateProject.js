import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";
import DatePicker from "react-date-picker";

class CreateProject extends Component {
  state = {
    title: "",
    content: "",
    priority: 100,
    date: null
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handlePrioritychange = e => {
    this.setState({
      priority: Number(e.target.value)
    });
  };
  handleDateChange = e => {
    console.log(e);
    this.setState({
      date: e
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.createProject(this.state);
    this.props.history.push("/");
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create new todo</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="content">Todos content</label>
            <textarea
              name=""
              id="content"
              className="materialize-textarea"
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <label htmlFor="priority">Priority</label>
            <br />
            <input
              type="range"
              min="1"
              max="100"
              id="priority"
              onChange={this.handlePrioritychange}
            />
            <p>{this.state.priority} 순위</p>
          </div>
          <div className="input-field">
            <p className="flow-text grey-text text-lighten-1">
              (Optional) ExpireDay
            </p>
            <DatePicker
              id="date"
              onChange={this.handleDateChange}
              value={this.state.date}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">CREATE</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    createProject: project => dispatch(createProject(project))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateProject);
