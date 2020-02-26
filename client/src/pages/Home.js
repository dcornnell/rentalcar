import React, { Component } from "react";
import NewCar from "../components/NewCar";
import axios from "axios";
import m from "moment";
import { Link } from "react-router-dom";

class Home extends Component {
  state = { cars: [], form: false };
  getCars = () => {
    console.log("hello");
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
    console.log(this.state.cars[index].rented);
    axios
      .put("/api/cars/" + id, {
        data: { rented: !this.state.cars[index].rented }
      })
      .then(res => {
        this.getCars();
      });
  }

  render() {
    const { cars } = this.state;
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

          <div className="row">
            <div className="table-responsive">
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
                    <th scope="col">Details</th>
                  </tr>
                </thread>
                <tbody>
                  {cars.map(car => {
                    const style = car.rented === true ? "table-danger" : "";
                    return (
                      <tr className={style}>
                        <th scope="row">{car.id}</th>
                        <td>{car.make}</td>
                        <td>{car.model}</td>
                        <td>{car.year}</td>
                        <td>{car.seats}</td>
                        <td>{car.price}</td>
                        <td>{m(car.start_date).format("MM/DD/YYYY")}</td>
                        <td>{m(car.end_date).format("MM/DD/YYYY")}</td>
                        <td>
                          {car.rented === true ? (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => {
                                this.rentCar(car.id);
                              }}
                            >
                              yes
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => {
                                this.rentCar(car.id);
                              }}
                            >
                              no
                            </button>
                          )}
                        </td>
                        <td>
                          <Link to={"/api/cars/" + car.id}>
                            <button
                              type="submit"
                              class="btn btn-warning  btn-sm"
                            >
                              View Car
                            </button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
