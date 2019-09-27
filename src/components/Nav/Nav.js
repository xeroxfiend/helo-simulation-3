import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import './nav.css'

class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="nav-container">
        {this.props.location.pathname === "/" ? (
          <div className="empty"></div>
        ) : (
          <div className="nav">
              <div className="user-image"></div>
              <div className="buttons-container">
                  <div className="home-new-container">
                      <button className="home">Home</button>
                      <button className="new-post">New Post</button>
                  </div>
                  <button className="logout">logout</button>
              </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Nav);
