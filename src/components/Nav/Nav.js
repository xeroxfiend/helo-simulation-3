import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import "./nav.css";
import {Link} from "react-router-dom";
import home from "../../assets/home.png";
import logout from "../../assets/logout.png";
import newpost from "../../assets/newpost.png";
import {connect} from "react-redux";
import {updateState} from "../../ducks/reducer";
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
    console.log('ladder')
    axios.get("/auth/me").then(res => {
      const {name, user_id, pic} = res.data[0];
      this.props.updateState(user_id, name, pic);
    });
  }

  logout() {
    axios.delete("/auth/logout").then(() => {
      this.props.updateState("", "", "");
    });
  }

  render() {
    return (
      <div className="nav-container">
        <div className="nav">
          <img className="user-image" src={this.props.pic} alt="user" />
          <h3 className="username">{this.props.username}</h3>
          <div className="nav-buttons-container">
            <div className="home-new-container">
              <Link to="/dashboard">
                <img className="home" src={home} alt="home" />
              </Link>
              <Link fn={this.logout} to="/new">
                <img className="new-post" src={newpost} alt="home" />
              </Link>
            </div>
            <Link to="/">
              <img
                onClick={() => this.logout()}
                className="logout"
                src={logout}
                alt="home"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {username, pic, user_id} = reduxState;
  return {username, pic, user_id};
}

export default withRouter(
  connect(
    mapStateToProps,
    {updateState}
  )(Nav)
);
