import React, { Component } from "react";
import axios from "axios";
import EditCar from "../components/EditCar";
import RentalList from "../components/RentalList";
import NewRental from "../components/NewRental";

class Car extends Component {
  state = {
    about: {},
    editCar: false,
    addRental: false
  };
  getInfo() {
    const id = this.props.match.params.id;
    axios.get("/api/cars/" + id).then(res => {
      const about = res.data;
      this.setState({ about: about });
    });
  }

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
        <div className="jumbotron">
          <h1>
            {this.state.about.make} {this.state.about.model}{" "}
          </h1>
          <div className="row pty-1">
            <div className="col">
              <h4>year: {this.state.about.year}</h4>
            </div>
            <div className="col">
              <h4>seats: {this.state.about.seats}</h4>
            </div>
            <div className="col">
              <h4>price pre day: {this.state.about.price}</h4>
            </div>
          </div>
          <hr class="my-4" />
          <button
            className="btn primary"
            onClick={() => {
              this.toggle("editCar");
            }}
          >
            Edit Car
          </button>

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
          <div class="card">
            <div class="card-body">
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
