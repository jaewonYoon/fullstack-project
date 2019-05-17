import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { deleteProject } from "../../store/actions/projectActions";
import { Link } from "react-router-dom";

import moment from "moment";
const ProjectDetails = props => {
  const { project } = props;
  const { auth } = props;
  const { id } = props.match.params;
  console.log(id);
  const handleSubmit = e => {
    props.deleteProject(id);
    props.history.push("/");
  };
  if (!auth.uid) return <Redirect to="/signin" />;
  if (project) {
    console.log(project.date);
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
            <hr />
            <p>priority: {project.priority}</p>
            {project.date
              ? `Deadline : ${moment(project.date.toDate()).format("L")}`
              : null}
          </div>

          <div className="card-action gret lighten-4 grey-text">
            <div>Posted by {project.authorFirstName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <button
              className="btn pink lighten-1 z-depth-0"
              onClick={handleSubmit}
            >
              DELETE
            </button>
          </div>
          <div className="input-field">
            <Link to={"/editproject/" + id}>
              <button
                className="btn pink lighten-1 z-depth-0"
                // onClick={handleSubmit}
              >
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container center">
      <p>Loading project...</p>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.todos;
  const project = projects ? projects[id] : null;
  return {
    project: project,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: id => dispatch(deleteProject(id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([
    {
      collection: "todos"
    }
  ])
)(ProjectDetails);
