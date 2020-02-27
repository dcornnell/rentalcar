import React, { Component } from "react";
import axios from "axios";
import EditCar from "../components/EditCar";
import RentalList from "../components/RentalList";
import NewRental from "../components/NewRental";
import NumberFormat from "react-number-format";

class Car extends Component {
  state = {
    about: {},
    editCar: false,
    addRental: false
  };

  deleteCar() {
    axios({
      method: "DELETE",
      url: "/api/cars/" + this.state.about.id
    }).then(setTimeout(this.props.history.push("/")), 2000);
  }

  getInfo() {
    const id = this.props.match.params.id;
    axios.get("/api/cars/" + id).then(res => {
      const about = res.data;
      this.setState({ about: about });
    });
  }
  //depending on the "property" open or close appropriate form
  toggle = property => {
    if (property === "editCar") {
      this.setState({ editCar: !this.state.editCar });
    } else if (property === "addRental") {
      this.setState({ addRental: !this.state.addRental });
    } else {
    }
  };

  FormSubmit(childState) {
    const id = this.props.match.params.id;
    axios.put("/api/cars/" + id, { data: childState }).then(() => {
      this.getInfo();
      this.setState({ editCar: !this.state.editCar });
    });
  }
  componentDidMount() {
    this.getInfo();
  }
  render() {
    return this.state.about ? (
      <div className="container">
        <div className="jumbotron py-2">
          <h1>
            {this.state.about.make} {this.state.about.model}{" "}
          </h1>
          <div className="row pty-1">
            <div className="col-md-12 col-lg-3">
              <h4>year: {this.state.about.year}</h4>
            </div>
            <div className="col-md-12 col-lg-3">
              <h4>seats: {this.state.about.seats}</h4>
            </div>
            <div className="col-md-12 col-lg-3">
              <h4>
                price/day:
                <NumberFormat
                  value={this.state.about.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale="2"
                  fixedDecimalScale={true}
                />{" "}
              </h4>
            </div>
            <div className="col-md-12 col-lg-3">
              <h4>
                status:{" "}
                {this.state.about.rented === true ? (
                  "available"
                ) : (
                  <b className="rented">rented</b>
                )}
              </h4>
            </div>
          </div>

          <hr className="my-4" />
          <div class="btn-group" role="group" aria-label="buttons">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => {
                this.toggle("editCar");
              }}
            >
              Edit Car
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                this.deleteCar();
              }}
            >
              Delete Car
            </button>
          </div>
          {this.state.editCar === true ? (
            <EditCar
              onSubmit={childState => {
                this.FormSubmit(childState);
              }}
              about={this.state.about}
            />
          ) : (
            ""
          )}
        </div>
        <h2>Rental History</h2>
        <button
          className="btn align-right"
          onClick={() => this.toggle("addRental")}
        >
          {this.state.addRental === true ? "hide form" : "add rental"}
        </button>

        {this.state.about.price !== undefined &&
        this.state.addRental === true ? (
          <div className="card">
            <div className="card-body">
              <NewRental
                price={this.state.about.price}
                carId={this.props.match.params.id}
                update={() => {
                  this.getInfo();
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        <RentalList rentals={this.state.about.Rentals} />
      </div>
    ) : (
      <div>info not found</div>
    );
  }
}

export default Car;
