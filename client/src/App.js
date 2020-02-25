import React, { Component } from "react";
import NewCar from "./components/NewCar";

import "./App.css";
import axios from "axios";
import m from "moment";

class App extends Component {
  state = { cars: [] };
  getCars() {
    axios.get("/api/cars").then(res => {
      const cars = res.data;
      this.setState({ cars: cars });
    });
  }

  componentDidMount() {
    this.getCars();
  }
  componentDidUpdate() {
    this.getCars();
  }
  render() {
    const { cars } = this.state;
    return (
      <h2>Add New Car</h2>
      <div>
        <table className="table">
          <thread className="align">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Make</th>
              <th scope="col">Model</th>
              <th scope="col">Year</th>
              <th scope="col">Seats</th>
              <th scope="col">Price per day</th>
              <th scope="col">Day Rented</th>
              <th scope="col">Day Returned</th>
              <th scope="col">Rented</th>
            </tr>
          </thread>
          <tbody>
            {cars.map(car => {
              return (
                <tr>
                  <th scope="row">{car.id}</th>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.seats}</td>
                  <td>{car.price}</td>
                  <td>{m(car.start_date).format("MM/DD/YYYY")}</td>
                  <td>{m(car.end_date).format("MM/DD/YYYY")}</td>
                  <td>{car.rented ? "rented" : "available"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <NewCar />
      </div>
    );
  }
}

export default App;
