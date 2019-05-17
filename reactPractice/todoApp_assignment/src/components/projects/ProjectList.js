import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../store/actions/projectActions";
const ProjectList = props => {
  const { projects } = props;
  console.log(props);
  return (
    <div className="project-list section">
      {projects &&
        projects.map(project => {
          return (
            <div key={project.id}>
              <Link to={"/project/" + project.id}>
                <ProjectSummary project={project} />
              </Link>
              <div className="switch">
                <label>
                  Yet
                  <input
                    type="checkbox"
                    onClick={e =>
                      setTimeout(function() {
                        e.persist();
                        props.deleteProject(project.id);
                      }, 700)
                    }
                  />
                  <span className="lever" />
                  Done
                </label>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    deleteProject: id => dispatch(deleteProject(id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(ProjectList);
