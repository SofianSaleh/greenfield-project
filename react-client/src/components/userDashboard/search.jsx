import React, { Component } from "react";
import $ from "jquery";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      category: "",
      filttredEvents: [],
      msg: ""
    };
  }

  // Handle's the change of state in the input and the options boxes
  searchIpuntChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // Submits a ajax request to the server and fetches the data brings back the matched data
  submitSearchHandler(e) {
    e.preventDefault();
    var searchComp = {};
    searchComp.eventName = this.state.eventName;
    if (this.state.category !== "") {
      searchComp.category = this.state.category;
    }
    // Sends request to the server with the parameters from the search
    $.ajax({
      url: "/api/events",
      type: "POST",
      data: searchComp,
      success: data => {
        if (data === "No Events with that name") {
          this.setState({
            msg: data
          });
        } else {
          // if it found data it should bring it back and update the state
          this.setState({
            filttredEvents: data
          });
          this.props.events(this.state.filttredEvents);
        }
      },
      error: err => console.log("Error in get request search", err)
    });
  }
 
  render() {
    return (
      <div>
        {console.log(this.state.filttredEvents)}
        <form onSubmit={this.submitSearchHandler.bind(this)}>
          <label htmlFor="search">Search By Name: </label>
          <input
            type="search"
            name="eventName"
            id="eventName"
            onChange={this.searchIpuntChangeHandler.bind(this)}
            value={this.state.eventName}
          />
          <select
            name="category"
            value={this.state.category}
            onChange={this.searchIpuntChangeHandler.bind(this)}
          >
            <option value="N/A">N/A</option>
            <option value="education">Educational</option>
            <option value="fun">Fun</option>
            <option value="sports">Sports</option>
            <option value="it">I.T</option>
            <option value="music">music</option>
          </select>
          <button type="submit">Search</button>
          <p>{this.state.msg}</p>
        </form>
      </div>
    );
  }
}

export default Search;
