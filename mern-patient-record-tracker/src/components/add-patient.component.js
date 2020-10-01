import React, { Component } from "react";
import axios from "axios";

export default class AddPatient extends Component {
  constructor(props) {
    super(props);

    this.onChangePatientName = this.onChangePatientName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      patientName: "",
    };
  }

  onChangePatientName(e) {
    this.setState({
      patientName: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const patient = {
      patientName: this.state.patientName,
    };

    console.log(patient);

    axios
      .post("http://localhost:5000/patients/add", patient)
      .then((res) => console.log(res.data));

    this.setState({
      patientName: "",
    });
  }

  render() {
    return (
      <div>
        <h3 className="mb-4">Add New Patient</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.patientName}
              onChange={this.onChangePatientName}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Patient"
              className="btn btn-warning mt-2"
            />
          </div>
        </form>
      </div>
    );
  }
}
