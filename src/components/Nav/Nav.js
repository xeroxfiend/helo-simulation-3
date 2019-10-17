import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./nav.css";
import {Link} from "react-router-dom";
import home from "../../assets/home.png";
import logout from "../../assets/logout.png";
import newpost from "../../assets/newpost.png";
import {connect} from "react-redux";
import {updateState, UPDATE_STATE} from "../../ducks/reducer";
import axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    axios.get("/auth/me").then(res => {
      // console.log(res.data[0])
      const {name, user_id, pic} = res.data[0]
      updateState({
        type: UPDATE_STATE,
        payload: {username: name, user_id, pic}
      });
    });
  }

  logout() {
    axios.delete('/auth/logout').then(() => {
      updateState({
        type: UPDATE_STATE,
        payload: {username: '', user_id: '', pic: ''}
      })
    })
  }

  render() {
    return (
      <div className="nav-container">
        {this.props.location.pathname === "/" ? (
          <div className="empty"></div>
        ) : (
          <div className="nav">
            <img className="user-image" src={this.props.pic} alt="user" />
            <h3 className="username">{this.props.username}</h3>
            <div className="nav-buttons-container">
              <div className="home-new-container">
                <Link to="/dashboard">
                  <img className="home" src={home} alt="home" />
                </Link>
                <Link to="/new">
                  <img className="new-post" src={newpost} alt="home" />
                </Link>
              </div>
              <Link to="/">
                <img onClick={this.logout()} className="logout" src={logout} alt="home" />
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {username, pic} = reduxState;
  return {username, pic};
}

export default withRouter(
  connect(
    mapStateToProps,
    updateState
  )(Nav)
);
