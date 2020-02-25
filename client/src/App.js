import React, { Component } from "react";

import "./App.css";
import axios from "axios";

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
  render() {
    const { cars } = this.state;
    return (
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
                <td>{car.car_maker}</td>
                <td>{car.car_model}</td>
                <td>{car.year}</td>
                <td>{car.seats}</td>
                <td>{car.price}</td>
                <td>{car.start_date}</td>
                <td>{car.end_date}</td>
                <td>{car.rented ? "rented" : "available"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default App;
