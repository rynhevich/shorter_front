import React from 'react';
import LinkService from '../services/link.service.js';
import AuthService from '../services/auth.service.js';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



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

    componentWillMount() {
        if (!AuthService.isLogined()) {
            this.props.history.push("/");
            window.location.reload();
        }
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
                <br/>
                <form className='formCreate' noValidate autoComplete='off'>
                    <div> <br/>
                    <TextField required label='Link to shorten' fullWidth name='link' value={this.state.link} onChange={this.onChangeLink}/><br/>
                    <TextField label='Add description' fullWidth multiline rowsMax={4} name='description' value={this.state.description} onChange={this.onChangeDescription}/><br/>
                    <TextField label='Add tags' fullWidth multiline rowsMax={4} name='tags' value={this.state.tags} onChange={this.onChangeTags}/><br/><br/>
                    <Button variant='contained' onClick={this.onSubmit}>Shorten</Button> <br/><br/>
                    <div className='errorText'> {this.state.message} </div> <br/>
                    </div>
                </form>
            </div>
        )
      }
}

export default CreateLink