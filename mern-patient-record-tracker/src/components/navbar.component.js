import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Patient Tracker
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Record
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Patient Log
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/patient" className="nav-link">
                Add Patient
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
