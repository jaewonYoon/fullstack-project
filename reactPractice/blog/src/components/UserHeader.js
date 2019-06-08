import React, { Component } from "react";
import { connect } from "react-redux";
class UserHeader extends Component {
  componentDidMount() {}
  render() {
    const { user } = this.props;
    return user ? (
      <div className="header">{user.name} </div>
    ) : (
      <div>Loading...</div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
