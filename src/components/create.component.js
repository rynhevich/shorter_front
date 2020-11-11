import React from 'react';

class CreateLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '',
            description: '',
            tags: '',
            message: ''
        };
        this.onChangeLink = this.onChangeLink.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTads = this.onChangeTads.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeLink(event) {
        this.setState({link: event.target.value});
    }

    onChangeDescription(event) {
        this.setState({description: event.target.value});
    }

    onChangeTads(event) {
        this.setState({tags: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();


    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                Link to shorten: <br/>
                <input type='text' name='link' value={this.state.link} onChange={this.onChangeLink}/>
                <input type='submit' value='Shorten link'/> <br/>
                Add description: <br/>
                <textarea name='description' value={this.state.description} onChange={this.onChangeDescription}/> <br/>
                Add tags: <br/>
                <textarea name='tags' value={this.state.tags} onChange={this.onChangeTads}/>
            </form>
        )
    }
}

export default CreateLink