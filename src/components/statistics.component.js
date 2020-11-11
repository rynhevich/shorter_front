import React from 'react';
import AuthService from '../services/auth.service.js';


class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: AuthService.getCurrentUser()
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        AuthService.logout()
        this.props.history.push("/");
        window.location.reload();
    }

    render() {


        return (
            <div>
                <div> Login: { this.state.user.username } </div>
                <form onSubmit={this.onSubmit}>
                    <input type="submit" value="Log off"/>
                </form>
            </div>
        )
    }
}

export default Statistics