import React from "react";

const Contact = props => {
  setTimeout(() => {
    props.history.push("/about");
  }, 2000);
  return (
    <div className="container">
      <h4 className="center">contact</h4>
      <p>Lorem ipsum</p>
    </div>
  );
};

export default Contact;
