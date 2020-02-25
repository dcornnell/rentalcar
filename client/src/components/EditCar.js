import React, { Component } from "react";
import m from "moment";

class EditCar extends Component {
  state = {
    make: this.props.about.make,
    model: this.props.about.model,
    year: this.props.about.year,
    seats: this.props.about.seats,
    price: this.props.about.price,
    start_date: this.props.about.start_date,
    end_date: this.props.about.end_date,
    rented: this.props.about.rented
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <form>
        <div className="row">
          <div className="col">
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
          <div className="col">
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
          <div className="col">
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
          <div className="col">
            <div className="form-group">
              <label for="seats">seats</label>
              <input
                type="input"
                className="form-control"
                id="seats"
                name="seats"
                value={this.state.seats}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="price">price per day</label>
              <input
                step="0.01"
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={this.state.price}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="starting-date">starting date</label>
              <input
                type="date"
                className="form-control"
                id="start-date"
                name="start_date"
                value={m(this.state.start_date).format("YYYY-MM-DD")}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label for="end-date">end date</label>
              <input
                type="date"
                className="form-control"
                id="end-date"
                name="end_date"
                value={m(this.state.end_date).format("YYYY-MM-DD")}
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
              onClick={event => {
                this.onSubmit(event);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default EditCar;
