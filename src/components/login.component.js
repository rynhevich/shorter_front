import React from 'react';
import AuthService from '../services/auth.service.js';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
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
                this.props.history.push("/statistics");
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
                <form onSubmit={this.onSubmit}>
                    Login: <br/>
                    <input type="text" name="username" value={this.state.username} onChange={this.onChangeUsername}/> <br/>
                    Password: <br/>
                    <input type="password" name="password" value={this.state.password} onChange={this.onChangePassword}/> <br/>
                    <input type="submit" value="Log in"/>
                </form>
                <div> {this.state.message} </div>
            </div>
        )
    }
}

export default LogIn