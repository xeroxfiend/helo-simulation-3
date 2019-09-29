import React, {Component} from "react";
import "./auth.css";
import logo from "../../assets/wink.png";
import axios from "axios";
import swal from "sweetalert2";
import {connect} from "react-redux";
import {updateState} from "../../ducks/reducer";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleChange(value, key) {
    this.setState({
      [key]: value
    });
  }

  register() {
    if (!this.state.username || !this.state.password)
      return swal.fire("Username and Password cannot be blank");

    axios
      .post("/auth/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        this.props.updateState(
          res.data.user.userId,
          this.state.username,
          `https://robohash.org/${this.state.username}?set=set5`
        );
        this.props.history.push("/dashboard");
      })
      .catch(err => {
        if (err.response.status === 404)
          return swal.fire("User already exists");
      });
  }

  async login() {
    if (!this.state.username || !this.state.password)
      return swal.fire("Username and Password cannot be blank");
    let res;
    try {
      res = await axios.post("/auth/login", {
        username: this.state.username,
        password: this.state.password
      });
    } catch (err) {
      if (err.response.status === 404 || err.response.status === 403) {
        return swal.fire("Incorrect Username or Password");
      } else {
        return swal.fire("Unknown error!");
      }
    }

    this.props.updateState(
      res.data.user.userId,
      this.state.username,
      `https://robohash.org/${this.state.username}?set=set5`
    );

    if (!res.data.user) return swal.fire(res.data.message);
    this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div className="auth">
        <div className="auth-container">
          <div className="logo">
            <img src={logo} alt="" className="logo-image" />
            <h1 className="logo-text">Helo</h1>
          </div>
          <div className="input-container">
            <div className="username-container">
              <p className="u">Username:</p>
              <input
                onChange={e => this.handleChange(e.target.value, "username")}
                className="username-input"
                type="text"
              />
            </div>
            <div className="password-container">
              <p className="p">Password:</p>
              <input
                onChange={e => this.handleChange(e.target.value, "password")}
                className="password-input"
                type="password"
              />
            </div>
          </div>
          <div className="login-buttons-container">
            <button onClick={() => this.login()} className="login">
              Login
            </button>
            <button onClick={() => this.register()} className="register">
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {updateState}
)(Auth);
