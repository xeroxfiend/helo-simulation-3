import React, {Component} from "react";
import "./auth.css";
import logo from "../../assets/wink.png";
import axios from "axios";
import swal from "sweetalert2";

class Auth extends Component {
  constructor() {
    super();
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
    axios
      .post("/auth/register", {
        username: this.state.username,
        password: this.state.password
      })
      .then(() => {
        this.props.history.push("/dashboard");
      });
  }

  async login() {
    const res = await axios.post("/auth/login", {
      username: this.state.username,
      password: this.state.password
    });

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

export default Auth;
