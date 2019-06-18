import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import streamEdit from "./streams/streamEdit";
import streamCreate from "./streams/streamCreate";
import streamDelete from "./streams/streamDelete";
import streamShow from "./streams/streamShow";
import streamList from "./streams/streamList";
import Header from "./Header";
const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact component={streamList} />
          <Route path="/strea ms/new" component={streamCreate} />
          <Route path="/streams/edit" component={streamEdit} />
          <Route path="/streams/delete" component={streamDelete} />
          <Route path="/streams/show" component={streamShow} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
