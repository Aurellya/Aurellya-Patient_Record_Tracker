import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditRecord extends Component {
  constructor(props) {
    super(props);

    this.onChangePatientName = this.onChangePatientName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      patientName: "",
      description: "",
      age: 0,
      date: new Date(),
      patients: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/records/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          patientName: response.data.patientName,
          description: response.data.description,
          age: response.data.age,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/patients/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            patients: response.data.map((patient) => patient.patientName),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangePatientName(e) {
    this.setState({
      patientName: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const record = {
      patientName: this.state.patientName,
      description: this.state.description,
      age: this.state.age,
      date: this.state.date,
    };

    console.log(record);

    axios
      .post(
        "http://localhost:5000/records/update/" + this.props.match.params.id,
        record
      )
      .then((res) => console.log(res.data));

    setTimeout(function () {
      window.location = "/";
    }, 1000);
  }

  render() {
    return (
      <div>
        <h3>Edit Patient Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.patientName}
              onChange={this.onChangePatientName}
            >
              {this.state.patients.map(function (patient) {
                return (
                  <option key={patient} value={patient}>
                    {patient}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Age: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.age}
              onChange={this.onChangeAge}
            />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Edit Record"
              className="btn btn-warning mt-2"
            />
          </div>
        </form>
      </div>
    );
  }
}
