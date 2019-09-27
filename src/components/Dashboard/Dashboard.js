import React, {Component} from "react";
import "./dashboard.css";
import searchButton from "../../assets/searchbutton.png";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      filter: true
    };
  }

  handleChange(value) {
      this.setState({
          search: value
      })
  }

  handleFilter(value) {
      console.log(value)
  }

  render() {
    return (
      <div className="dashboard">
        <div className="search-container">
          <div className="input-and-buttons">
            <input onChange={e => this.handleChange(e.target.value)} placeholder='Search by Title' className="search-bar" type="text" />
            <img src={searchButton} alt="search" className="search-button" />
            <button className="reset">Reset</button>
          </div>
          <div className="filter-container">
              <h3 className="filter-text">My Posts</h3>
            <input onChange={e => this.handleFilter(e.target.value)} type="checkbox" className="filter" />
          </div>         
        </div>
        <div className="posts-container">
              posts
          </div>
      </div>
    );
  }
}

export default Dashboard;
