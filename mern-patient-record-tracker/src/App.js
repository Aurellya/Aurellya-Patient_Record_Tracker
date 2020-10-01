import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";

import Navbar from "./components/navbar.component";
import RecordsList from "./components/records-list.component";
import EditRecord from "./components/edit-record.component";
import CreateRecord from "./components/create-record.component";
import AddPatient from "./components/add-patient.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={RecordsList} />
        <Route path="/edit/:id" component={EditRecord} />
        <Route path="/create" component={CreateRecord} />
        <Route path="/patient" component={AddPatient} />
      </div>
    </Router>
  );
}

export default App;
