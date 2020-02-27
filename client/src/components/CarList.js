import React, { Component } from "react";
import NumberFormat from "react-number-format";
import m from "moment";
import { Link } from "react-router-dom";
class CarList extends Component {
  render() {
    return (
      <div className="table-responsive">
        <table className="table">
          <thread className="align">
            <tr>
              <th>#</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Seats</th>
              <th>Price per day</th>
              <th>Day Rented</th>
              <th>Day Returned</th>
              <th>Available</th>
              <th>Details</th>
            </tr>
          </thread>
          <tbody>
            {this.props.cars.map(car => {
              const style = car.rented === true ? "table-danger" : "";
              return (
                <tr className={style}>
                  <td>{car.id}</td>
                  <td>{car.make}</td>
                  <td>{car.model}</td>
                  <td>{car.year}</td>
                  <td>{car.seats}</td>
                  <td>
                    <NumberFormat
                      value={car.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      decimalScale="2"
                      fixedDecimalScale={true}
                    />
                  </td>
                  <td>{m(car.start_date).format("MM/DD/YYYY")}</td>
                  <td>{m(car.end_date).format("MM/DD/YYYY")}</td>
                  <td>
                    {car.rented === true ? (
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          this.props.rentCar(car.id);
                        }}
                      >
                        no
                      </button>
                    ) : (
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          this.props.rentCar(car.id);
                        }}
                      >
                        yes
                      </button>
                    )}
                  </td>
                  <td>
                    <Link to={"/api/cars/" + car.id}>
                      <button type="submit" class="btn btn-warning  btn-sm">
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
    );
  }
}

export default CarList;
