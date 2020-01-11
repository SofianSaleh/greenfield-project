import React, { Component } from "react";
import Axios from "axios";
import $ from "jquery";
import NavBar from "./navBar.jsx";
import { Redirect } from "react-router-dom";

class EditUserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dateOfBirth: "",
      phoneNumber: "",
      about: "",
      imgUrl: "",
      redirectToProfilePage: false
    };
  }

  onCHangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitHandler(e) {
    e.preventDefault();
    console.log(this.state + '1')
    if(this.state.fullname !== "" || this.state.dateOfBirth !== "" || this.state.phoneNumber !== "" || this.state.about !== "" || this.state.imgUrl !== ""){

      let User = {};
      if (localStorage && localStorage.getItem("user")) {
        User = JSON.parse(JSON.parse(localStorage.getItem("user")));
        this.setState({
          userId: User._id
        });
      }
      console.log(this.state + '2')

      $.ajax({
        url: `/api/users/${User._id}`,
        type: "PUT",
        data: this.state,
        success: data => {
          this.setState({ redirectToProfilePage: true })
        },
        error: err => console.log("reeeee")
      });
    }else{
      this.setState({ redirectToProfilePage: true })
    }
  }
  render() {
    const { fullname, dateOfBirth, phoneNumber, about, imgUrl } = this.state;

    if(this.state.redirectToProfilePage){
      this.setState({
        redirectToProfilePage: false
      });
      return (
        <Redirect
          to={{
            pathname: "/profile"
          }}
        />
      );
    
    }


    return (
      <div>
        <NavBar />

        <div className="container">
          <form onSubmit={this.onSubmitHandler.bind(this)}>
            <fieldset>
              <legend>Edit User Profile</legend>

              <div className="form-group">
                <label htmlFor="fullName">Full Name: </label>
                <input
                  type="text"
                  value={fullname}
                  name="fullname"
                  className="form-control"
                  id="fullName"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Full Name"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date Of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  name="birthDate"
                  className="form-control"
                  id="dateOfBirth"
                  placeholder="Enter Your Birth Date"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="number"
                  value={phoneNumber}
                  name="phoneNumber"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Enter Your Phone number"
                  onChange={this.onCHangeHandler.bind(this)}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your Phone Number with anyone else without
                  your premision.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="about">About</label>
                <textarea
                  className="form-control"
                  value={about}
                  name="about"
                  id="about"
                  rows="3"
                  onChange={this.onCHangeHandler.bind(this)}
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="urlPic">Add an image url</label>
                <input
                  type="text"
                  value={imgUrl}
                  name="imgUrl"
                  className="form-control-file"
                  onChange={this.onCHangeHandler.bind(this)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default EditUserProfile;
