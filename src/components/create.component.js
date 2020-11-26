import React from 'react';
import LinkService from '../services/link.service.js';


class CreateLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            description: '',
            tags: '',
            message: ''
        };
    }

    onChangeLink = (event) => {
        this.setState({link: event.target.value});
    }

    onChangeDescription = (event) => {
        this.setState({description: event.target.value});
    }

    onChangeTags = (event) => {
        this.setState({tags: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault();

        if (!this.state.link) {
            this.setState({message: 'link was not provided'})
        } else {
            LinkService.create(this.state.link, this.state.description, this.state.tags)
            .then(response => {
                this.setState({message: response.data.message});
                this.props.onCreateLink(response.data.id);
            })
            .then(() => {
                this.props.history.push('/l');
            })
            .catch((error) => {
                this.setState({message: error.response.data.message});
            })
        }


    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    Link to shorten: <br/>
                    <input type='text' name='link' value={this.state.link} onChange={this.onChangeLink}/>
                    <input type='submit' value='Shorten'/> <br/>
                    Add description: <br/>
                    <textarea name='description' value={this.state.description} onChange={this.onChangeDescription}/> <br/>
                    Add tags: <br/>
                    <textarea name='tags' value={this.state.tags} onChange={this.onChangeTags}/>
                </form>
                <div> {this.state.message} </div>
            </div>
        )
    }
}

export default CreateLink