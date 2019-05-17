import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
const SignedInLinks = props => {
  const hrefLink = "#";
  return (
    <ul className="right">
      <li>
        <NavLink to="/create">새 일 작성! </NavLink>
      </li>
      <li>
        <a href={hrefLink} onClick={props.signOut}>
          로그아웃
        </a>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </NavLink>
      </li>
    </ul>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(signOut());
    }
  };
};
export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
