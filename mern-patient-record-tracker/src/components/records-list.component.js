import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Record = (props) => (
  <tr>
    <td>{props.record.patientName}</td>
    <td>{props.record.description}</td>
    <td>{props.record.age}</td>
    <td>{props.record.date.substring(0, 10)}</td>
    <td>
      <Link to={"/edit/" + props.record._id}>edit</Link> |{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class RecordsList extends Component {
  constructor(props) {
    super(props);

    this.deleteRecord = this.deleteRecord.bind(this);

    this.state = { records: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/records/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteRecord(id) {
    axios.delete("http://localhost:5000/records/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      records: this.state.records.filter((rl) => rl._id !== id),
    });
  }

  recordList() {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3 className="mb-4">Patient Medical Record</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Age</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}
