import React from "react";

class GoogleAuth extends React.Component {
  state = { isSignedIn: null }; // we don't know user is signed in or not
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      //callback after loaded api successfully
      window.gapi.client
        .init({
          // init returns promise
          clientId:
            "104511530998-53jaa0dq3cajed1up40snvo8qffjv1c7.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();

          this.setState({ isSignedIn: this.auth.isSignedIn.get() });
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

  onSignIn = () => {
    this.auth.signIn();
  };
  onSignOut = () => {
    this.auth.signOut();
  };
  renderAuthButton() {
    if (this.state.isSignedIn === null) {
      return <div> null</div>;
    } else if (this.state.isSignedIn) {
      return (
        <button onClick={this.onSignOut} className="ui red googld button">
          <i className="google icon" />
          Sign Out With Google
        </button>
      );
    } else {
      return (
        <button onClick={this.onSignIn} className="ui red googld button">
          <i className="google icon" />
          Sign In With Google
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
export default GoogleAuth;
