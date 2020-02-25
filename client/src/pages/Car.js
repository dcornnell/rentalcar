import React, { Component } from "react";
import axios from "axios";
import EditCar from "../components/EditCar";

class Car extends Component {
  state = {
    about: {},
    edit: false
  };
  getInfo() {
    const id = this.props.match.params.id;
    axios.get("/api/cars/" + id).then(res => {
      const about = res.data;
      this.setState({ about: about });
    });
  }

  toggleEdit = event => {
    event.preventDefault();
    this.setState({ edit: !this.state.edit });
  };

  FormSubmit(childState) {
    console.log(childState);
    const id = this.props.match.params.id;
    axios.put("/api/cars/" + id, { data: childState }).then(this.getInfo());
  }
  componentDidMount() {
    this.getInfo();
  }
  render() {
    return this.state.about ? (
      <div>
        <h1>
          make: {this.state.about.make}, model: {this.state.about.model}, year:
          {this.state.about.year}, seats: {this.state.about.seats}
        </h1>
        <button className="button" onClick={this.toggleEdit}>
          Edit
        </button>
        {this.state.edit === true ? (
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
    ) : (
      <div>info not found</div>
    );
  }
}

export default Car;
