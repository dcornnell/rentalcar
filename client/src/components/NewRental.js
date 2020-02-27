import React, { Component } from "react";
import axios from "axios";
import NumberFormat from "react-number-format";
class NewRental extends Component {
  state = {
    CarId: this.props.carId,
    miles: "",
    price: this.props.price,
    start_date: "",
    end_date: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    axios
      .post("/api/rentals", {
        CarId: this.state.CarId,
        miles: this.state.miles,
        price: this.state.price,
        total_price: this.getPrices(
          this.state.start_date,
          this.state.end_date,
          this.state.price,
          "total"
        ),
        vat_price: this.getPrices(
          this.state.start_date,
          this.state.end_date,
          this.state.price,
          "vat"
        ),
        days: this.getDays(this.state.start_date, this.state.end_date),
        start_date: this.state.start_date,
        end_date: this.state.end_date
      })
      .then(response => {
        this.setState(
          {
            miles: "",
            start_date: "",
            end_date: ""
          },
          this.props.update
        );
        this.props.update();
      })
      .catch(function(error) {});
  };

  getDays(start_date, end_date) {
    const days = Math.floor(
      (Date.parse(end_date) - Date.parse(start_date)) / 86400000
    );
    if (isNaN(days)) {
      return 0;
    }
    return days;
  }

  getPrices(start_date, end_date, price, type) {
    const days = this.getDays(start_date, end_date);

    const total = days * price;
    const vat = total + total * 0.21;
    if (type === "total") {
      return total;
    } else if (type === "vat") {
      return vat;
    } else {
      return "error";
    }
  }

  render() {
    return (
      <form>
        <div className="row">
          <div className="column">
            <div className="form-group">
              <label for="Rented Date">Rented Date</label>
              <input
                type="date"
                className="form-control"
                aria-describedby="Rented Date"
                name="start_date"
                value={this.state.start_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="Return Date">Return Date</label>
              <input
                type="date"
                className="form-control"
                aria-describedby="ReturnDate"
                name="end_date"
                value={this.state.end_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="Days Rented">Days Rented</label>
              <input
                type="number"
                className="form-control"
                aria-describedby="ReturnDate"
                name="end_date"
                value={this.getDays(this.state.start_date, this.state.end_date)}
                readOnly
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="Miles">Miles</label>
              <input
                type="number"
                className="form-control"
                aria-describedby="miles"
                name="miles"
                value={this.state.miles}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <table className="table">
            <thread className="align">
              <tr>
                <th scope="col">Price Per Day</th>
                <th scope="col">Total Price</th>
                <th scope="col">Vat Price</th>
              </tr>
            </thread>
            <tbody>
              <tr>
                <td>{this.props.price}</td>
                <td>
                  <NumberFormat
                    value={this.getPrices(
                      this.state.start_date,
                      this.state.end_date,
                      this.state.price,
                      "total"
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale="2"
                    fixedDecimalScale={true}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={this.getPrices(
                      this.state.start_date,
                      this.state.end_date,
                      this.state.price,
                      "vat"
                    )}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale="2"
                    fixedDecimalScale={true}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="row">
          <div className="col text-right">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={this.handleFormSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default NewRental;
