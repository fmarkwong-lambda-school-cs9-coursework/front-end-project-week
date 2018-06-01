import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = async e => {
    e.preventDefault();
    const response = await axios.post(`${process.env.REACT_APP_API}/login`, this.state)
    localStorage.token = response.data.token; 
    this.props.setIsLoggedIn(true);
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="auth">
      <div className="card card-container">
        <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
        <p id="profile-name" className="profile-name-card"></p>
        <form className="form-signin" onSubmit={this.submitHandler} >
          <span id="reauth-email" className="reauth-email"></span>
          <input style={{ marginBottom: '2px' }} name="username" value={this.state.username} onChange={this.inputHandler} className="form-control" placeholder="User Name" required autoFocus />
          <input name="password" value={this.state.password} onChange={this.inputHandler}  type="password"  className="form-control" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block btn-signin" type="submit">Login</button>
        </form>
      </div>
      </div>
    );
  }
}

