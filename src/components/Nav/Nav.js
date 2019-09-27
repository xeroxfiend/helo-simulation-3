import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./nav.css";
import {Link} from "react-router-dom";

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
            <div className="nav-buttons-container">
              <div className="home-new-container">
                <Link to="/dashboard">
                  <button className="home">Home</button>
                </Link>
                <Link to="/new">
                  <button className="new-post">New Post</button>
                </Link>
              </div>
              <Link to="/">
                <button className="logout">logout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Nav);
