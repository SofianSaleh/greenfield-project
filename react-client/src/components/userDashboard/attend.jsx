import React, { Component } from "react";
import EventsList from "../userDashboard/userDashboard.jsx"
import $ from 'jquery'

class Attend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attend: true,
      home: false
    };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick() {
    var obj = {};
    obj.UserId = this.props.userId;
    obj.eventId = this.props.eventId;
    $.ajax({
      url: "/api/jointEventUser",
      type: "POST",
      data: obj,
      success: data => {
        if (data === "Joined") {
          this.setState({
            attend: false,
            home: true
          });
        }
      },
      error: (err) => {
          throw err
      }
    });
  }

  render() {
    return (
      <div>
          {this.state.attend ?
          <div>
        
        <h1>USER INFO</h1>
        <div>
          <label htmlFor="expiry_date">Expiry date: </label>
          <br />
          <br />
          <input
            type="date"
            name="Expiry_date"
            id="Expiry_date"
            onChange={this.handleChange.bind(this)}
            placeholder="Enter Credit Card Expiry Date"
            required
          />
          <hr />
        </div>
        <div>
          <label htmlFor="CVV">CVV: </label>
          <br />
          <br />
          <input
            type="number"
            name="CVV"
            id="CVV"
            onChange={this.handleChange.bind(this)}
            placeholder="Enter CVV"
            required
          />
          <hr />
        </div>
        <div>
          <label htmlFor="Billing">Billing address: </label>
          <br />
          <br />
          <input
            type="text"
            name="Billing_address"
            id="Billing_address"
            onChange={this.handleChange.bind(this)}
            placeholder="Enter password"
            required
          />
          <hr />
        </div>
        <div>
          <br />
          <br />
          <button type="submit" onClick={this.handleClick.bind(this)}>
            Submit
          </button>
          <hr />
        </div>
        </div>
    :
    <UserDashboard />    
    }
      </div>
    );
  }
}

export default Attend;
