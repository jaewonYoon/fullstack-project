import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const Notifications2 = props => {
  const todos = props.projects;
  const date = new Date().getTime() / 1000;
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">기한을 넘었어요!! </span>
          <ul className="notifications">
            {todos &&
              todos.map(item => {
                if (item.authorId === props.select_id) {
                  if (item.date && item.date.seconds < date) {
                    return (
                      <Link to={"/project/" + item.id} key={item.id}>
                        <li>
                          <span className="pink-text">{item.title}</span>
                        </li>
                        <hr />
                      </Link>
                    );
                  } else return null;
                } else return null;
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    projects: state.firestore.ordered.todos,
    auth: state.firebase.auth
  };
};
export default connect(mapStateToProps)(Notifications2);
