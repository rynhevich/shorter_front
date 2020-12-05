import React from 'react';
import AuthService from '../services/auth.service.js';
import Button from '@material-ui/core/Button';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: AuthService.getCurrentUser()
        }
    }

    componentWillMount() {
        if (!AuthService.isLogined()) {
            this.props.history.push("/");
            window.location.reload();
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
            
        AuthService.logout();
        this.props.history.push("/");
        window.location.reload();
    }

    render() {
        return (
            <div> <br/>
                <div> You logged in as { this.state.user.username } </div> <br/>
                <Button variant='contained' onClick={this.onSubmit}>Log off</Button>
            </div>
        )
    }
}

export default Logout