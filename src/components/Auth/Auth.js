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
      });
  }

  async login() {
    if (!this.state.username || !this.state.password)
      return swal.fire("Username and Password cannot be blank");

    const res = await axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    });
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
            <input
              onChange={e => this.handleChange(e.target.value, "username")}
              placeholder="Username"
              className="username-input"
              type="text"
            />
            <input
              onChange={e => this.handleChange(e.target.value, "password")}
              placeholder="Password"
              className="password-input"
              type="password"
            />
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
