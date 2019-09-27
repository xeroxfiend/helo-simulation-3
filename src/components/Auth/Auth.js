import React, {Component} from "react";
import './auth.css'
import logo from '../../assets/wink.png'

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
      })
  }

  render() {
    return (
      <div className="auth">
        <div className="auth-container">
          <div className="logo">
              <img src={logo} alt="" className="logo-image"/>
              <h1 className='logo-text'>Helo</h1>
          </div>
          <div className="input-container">
            <input onChange={e => this.handleChange(e.target.value, 'username')} placeholder='Username' className="username-input" type="text" />
            <input onChange={e => this.handleChange(e.target.value, 'password')} placeholder='Password' className="password-input" type="password" />
          </div>
          <div className="login-buttons-container">
            <button className="login">Login</button>
            <button className="register">Register</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
