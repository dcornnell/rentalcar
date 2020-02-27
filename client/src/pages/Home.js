import React, { Component } from "react";
import NewCar from "../components/NewCar";
import axios from "axios";

import CarList from "../components/CarList";
class Home extends Component {
  state = { cars: [], form: false };
  getCars = () => {
    axios.get("/api/cars").then(res => {
      const cars = res.data;
      this.setState({ cars: cars });
    });
  };

  showForm = event => {
    event.preventDefault();
    this.setState({ form: !this.state.form });
  };

  componentDidMount() {
    this.getCars();
  }

  rentCar(id) {
    const index = this.state.cars.findIndex(car => car.id === id);

    axios
      .put("/api/cars/" + id, {
        data: { rented: !this.state.cars[index].rented }
      })
      .then(res => {
        this.getCars();
      });
  }

  render() {
    console.log(this.state.cars);
    return (
      <div className="container">
        <div className="column">
          <div className="row">
            <h2>Fleet</h2>
            <button className="btn align-right" onClick={this.showForm}>
              {this.state.form === true ? "hide form" : "add car"}
            </button>
          </div>

          {this.state.form === true ? (
            <div class="card">
              <div class="card-body">
                <NewCar update={this.getCars} />{" "}
              </div>
            </div>
          ) : (
            ""
          )}

          <CarList
            cars={this.state.cars}
            rentCar={childState => this.rentCar(childState)}
          />
        </div>
      </div>
    );
  }
}

export default Home;
