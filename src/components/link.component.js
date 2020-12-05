import React from 'react';
import Button from '@material-ui/core/Button';

const URL = 'http://localhost:3000/#/'

class ShowLink extends React.Component {
    componentWillMount() {
        if (!this.props.id) {
            this.props.history.push("/create");
            window.location.reload();
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        
        this.shortLink.select();
        document.execCommand('copy');
                
    }

    render() {
        return(
            <div> <br/>
                <form onSubmit={this.onSubmit}>
                <input id='fildToCopy' type='text' ref={text => (this.shortLink = text)} value={URL + 't/' + this.props.id}/>
                <Button variant='contained' type='submit'>Copy</Button>
                </form>
            </div>
        )
    }
}

export default ShowLink