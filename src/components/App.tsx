import React from "react";
import { Route } from "react-router-dom";
import CustomerList from "./CustomerList";
import CustomerCreate from "./CustomerCreate";
import CustomerEdit from "./CustomerEdit";

const App = () => {
  return (
    <div className="ui container">
      <h1>Customer Application</h1>
      <div>
        <Route path="/" exact component={CustomerList} />
        <Route path="/customer/new" exact component={CustomerCreate} />
        <Route path="/customer/edit/:id" exact component={CustomerEdit} />
      </div>
    </div>
  );
};

export default App;
