import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { deletePost } from "../actions/PostActions";
class Post extends Component {
  handleClick = () => {
    this.props.deletePost(this.props.posts.id);
    this.props.history.push("/");
  };

  render() {
    console.log(this.props);
    const post = this.props.posts ? (
      <div className="post">
        <h4 className="center">{this.props.posts.title}</h4>
        <p>{this.props.posts.body}</p>
        <div className="center">
          <button className="btn grey" onClick={this.handleClick}>
            Delete Post
          </button>
        </div>
      </div>
    ) : (
      <div className="center"> Loading... </div>
    );
    return <div className="container">{post}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.post_id;
  return {
    //what we want to apply
    posts: state.posts.find(post => post.id === id)
  };
};
const mapDispatchToProps = dispatch => {
  return {
    deletePost: id => {
      dispatch(deletePost(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
