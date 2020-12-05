import React from 'react';
import AuthService from '../services/auth.service.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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

    componentWillMount() {
      if (AuthService.isLogined()) {
          this.props.history.push('/create');
          window.location.reload();
      }
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
      } else if (this.state.username.length < 6) {
        this.setState({message: 'username should be not shorter then 6 symbols'})
      } else if (this.state.password.length < 6) {
        this.setState({message: 'password should be not shorter then 6 symbols'})
      } else {
        AuthService.regester(this.state.username, this.state.password)
        .then(response => {
          this.setState({message: response.data.message});
        })
        .then(() => {
          this.props.history.push('/');
        })
        .catch(error => {
          this.setState({message: error.response.data.message});
        })
      } 
    }
  
    render() {
      return (
          <div>
              <br/>
              <form className='form' noValidate autoComplete='off'>
                  <div> <br/>
                  <TextField required label='Login' name='username' onChange={this.onChangeUsername}/><br/>
                  <TextField required label='Password' type='password' value={this.state.password} onChange={this.onChangePassword}/><br/>
                  <TextField required label='Password Confirmation' type='password' value={this.state.passwordConfirmation} onChange={this.onChangePasswordConfirmation}/><br/><br/>
                  <Button variant='contained' onClick={this.onSubmit}>Regester</Button> <br/><br/>
                  <div className='errorText'> {this.state.message} </div> <br/>
                  </div>
              </form>
          </div>
      )
    }
  }

export default Regestration