import React, { Component } from "react";
import axios from "axios";

class NewCar extends Component {
  state = {
    make: "",
    model: "",
    year: "",
    seats: "",
    price: "",
    start_date: "",
    end_date: "",
    rented: false
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
      .post("/api/cars", {
        make: this.state.make,
        model: this.state.model,
        year: this.state.year,
        seats: this.state.seats,
        price: this.state.price,
        start_date: this.state.start_date,
        end_date: this.state.end_date
      })
      .then(response => {
        this.setState(
          {
            make: "",
            model: "",
            year: "",
            seats: "",
            price: "",
            start_date: "",
            end_date: ""
          },
          this.props.update
        );
      })
      .catch(function(error) {});
  };

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-sm-12 col-md-4">
            <div className="form-group">
              <label for="Make">Make</label>
              <input
                type="input"
                className="form-control"
                aria-describedby="Car make"
                placeholder="Car Make"
                name="make"
                value={this.state.make}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div class="form-group">
              <label for="Model">Model</label>
              <input
                type="input"
                className="form-control"
                id="model"
                placeholder="Car Model"
                name="model"
                value={this.state.model}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-4">
            <div class="form-group">
              <label for="year">Year</label>
              <input
                type="input"
                className="form-control"
                id="year"
                placeholder="year"
                name="year"
                value={this.state.year}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-3">
            <div className="form-group">
              <label for="seats">Seats</label>
              <input
                type="input"
                className="form-control"
                id="seats"
                placeholder="seats"
                name="seats"
                value={this.state.seats}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="form-group">
              <label for="price">price per day</label>
              <input
                type="number"
                className="form-control"
                id="price"
                placeholder="00.00"
                name="price"
                value={this.state.price}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="form-group">
              <label for="starting-date">starting date</label>
              <input
                type="date"
                className="form-control"
                id="start-date"
                name="start_date"
                value={this.state.start_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-3">
            <div className="form-group">
              <label for="end-date">end date</label>
              <input
                type="date"
                className="form-control"
                id="end-date"
                name="end_date"
                value={this.state.end_date}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
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

export default NewCar;
