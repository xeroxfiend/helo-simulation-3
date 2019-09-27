import React, {Component} from "react";
import "./dashboard.css";
import searchButton from "../../assets/searchbutton.png";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: ""
    };
  }

  render() {
    return (
      <div className="dashboard">
        <div className="search-container">
          <div className="input-and-buttons">
            <input className="search-bar" type="text" />
            <img src={searchButton} alt="search" className="search-button" />
            <button className="reset">Reset</button>
          </div>
          <div className="filter-container">
              <h3 className="filter-text">My Posts</h3>
            <input type="checkbox" className="filter" />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
