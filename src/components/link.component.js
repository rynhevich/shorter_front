import React from 'react';

const URL = 'http://localhost:3000/#/'

class ShowLink extends React.Component {

    onSubmit = (event) => {
        event.preventDefault();
        
        this.shortLink.select();
        document.execCommand("copy");
                
    }

    render() {
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                <input type='text' ref={text => (this.shortLink = text)} value={URL + 't/' + this.props.id}/>
                <input type='submit' value='Copy'/> <br/>

                </form>
            </div>
        )
    }
}

export default ShowLink