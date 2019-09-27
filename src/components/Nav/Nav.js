import React, {Component} from "react";
import {withRouter} from "react-router-dom";

class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="nav">
        {this.props.location.pathname === "/" ? (
          <div className="empty"></div>
        ) : (
          <p>Nav!</p>
        )}
      </div>
    );
  }
}

export default withRouter(Nav);
