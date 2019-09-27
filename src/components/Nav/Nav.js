import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./nav.css";
import {Link} from "react-router-dom";
import home from '../../assets/home.png'
import logout from '../../assets/logout.png'
import newpost from '../../assets/newpost.png'
import {connect} from 'react-redux'

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
                  <img className='home' src={home} alt="home"/>
                </Link>
                <Link to="/new">
                <img className='new-post' src={newpost} alt="home"/>
                </Link>
              </div>
              <Link to="/">
              <img className='logout' src={logout} alt="home"/>
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
    const {username, pic} = reduxState
    return {username, pic}
}

export default withRouter(connect(mapStateToProps)(Nav));
