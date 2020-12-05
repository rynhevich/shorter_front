import React from 'react';
import AuthService from '../services/auth.service.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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

    onSubmit = (event) => {
        event.preventDefault();

        if (!this.state.username || !this.state.password) {
            this.setState({message: 'required fild is empty'})
        } else {
            AuthService.login(this.state.username, this.state.password)
            .then(() => {
                this.props.history.push('/create');
                window.location.reload();
            })
            .catch(error => { 
                this.setState({message: error.response.data.message})
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
                    <TextField required label='Password' type='password' autoComplete='current-password' value={this.state.password} onChange={this.onChangePassword}/><br/><br/>
                    <Button variant='contained' onClick={this.onSubmit}>Log in</Button> <br/><br/>
                    <div className='errorText'> {this.state.message} </div> <br/>
                    </div>
                </form>
            </div>
        )
    }
}

export default LogIn