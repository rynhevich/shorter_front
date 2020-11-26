import React from 'react';
import AuthService from '../services/auth.service.js';


class Regestration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
        passwordConfirmation: '',
        message: ''
      };
    }
  
    onChangeUsername = (event) => {
      this.setState({username: event.target.value});
    }
  
    onChangePassword = (event) => {
      this.setState({password: event.target.value});
    }
  
    onChangePasswordConfirmation = (event) => {
      this.setState({passwordConfirmation: event.target.value});
    }
  
    onSubmit = (event) => {
      event.preventDefault();
  
      if (!this.state.username || !this.state.password) {
        this.setState({message: 'required fild is empty'})
      } else if (this.state.password !== this.state.passwordConfirmation) {
        this.setState({message: 'password has not been confirmed'})
      } else {
        AuthService.regester(this.state.username, this.state.password)
        .then(response => {
          this.setState({message: response.data.message});
        })
        .then(() => {
          this.props.history.push('/');
          window.location.reload();
        })
        .catch(error => {
          this.setState({message: error.response.data.message});
        })
      } 
    }
  
    render() {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            Login: <br/>
            <input type="text" name="username" value={this.state.username} onChange={this.onChangeUsername}/> <br/>
            Password: <br/>
            <input type="password" name="password" value={this.state.password} onChange={this.onChangePassword}/> <br/>
            Confirm password: <br/>
            <input type="password" name="passwordConfirmation" value={this.state.passwordConfirmation} onChange={this.onChangePasswordConfirmation}/> <br/>
            <input type="submit" value="Register"/>
          </form>
          <div> {this.state.message} </div>
        </div>
      )
    }
  }

export default Regestration