import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProject } from "../../store/actions/projectActions";
const ProjectList = props => {
  const { projects } = props;
  return (
    <div className="project-list section">
      {projects &&
        projects.map(project => {
          if (project.authorId === props.select_id) {
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
          } else return null;
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
