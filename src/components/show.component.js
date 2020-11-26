import React from 'react';
import LinkService from '../services/link.service.js';

class ShowLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: window.location.href.split("/").pop(),
            original: '',
            description: '',
            tags: '',
            message: ''
        };
    }

    componentDidMount() {
        LinkService.getLink(this.state.id)
        .then( response => {
            this.setState({original: response.data.original});
            this.setState({description: response.data.description});
            this.setState({tags: response.data.tags});
        })
        .catch((error) => {
            this.setState({message: error.response.data.message});
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        const redirectLink = LinkService.check(this.state.original);
        window.location.replace(redirectLink);
        LinkService.counterUpdate(this.state.id);
    }


    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <input type='text' name='link' value={this.state.original}/>
                <input type='submit' value='Visit website'/> <br/>

                </form>
                <div>
                    Descrption: {this.state.description} <br/>
                    Tags: {this.state.tags} <br/>
                </div>
                <div> {this.state.message} </div>
            </div>
        )
    }
}

export default ShowLink