import React from 'react';
import LinkService from '../services/link.service.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class ShowLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: window.location.href.split('/').pop(),
            original: '',
            description: '',
            tags: [],
            links: [],
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
        if (this.state.original !== '') {
            const redirectLink = LinkService.check(this.state.original);
            window.location.replace(redirectLink);
            LinkService.counterUpdate(this.state.id);
        }
    }

    onClickTag = (tag) => {
        LinkService.getLinksByTag(tag)
        .then( response => {
            this.setState({links: response.data});
        })
        .catch((error) => {
            this.setState({message: error.response.data.message});
        })     
    }

    onClickRow = (id) => {
        this.props.history.push(id);
        window.location.reload();
    }

    render() {
        return(
            <div>
                <div className='showLink'>
                    <TextField variant='outlined' style={{ margin: 8 }} name='link' value={this.state.original} fullWidth InputProps={{readOnly: true}}/>
                </div><br/>
                <Button variant='contained' onClick={this.onSubmit}>Visit website</Button>
                <div> 
                    {this.state.description ?
                        <div> <br/> <span className='text'> Descrption: </span> {this.state.description} </div>
                    : null}
                    {(this.state.tags.length !== 0) ? 
                        <div>
                             <br/> <span className='text'> Tags: </span>
                            {this.state.tags.map((tag) => (
                                <span className='tag' onClick={() => this.onClickTag(tag)}> {tag} </span>
                            ))}
                        </div>
                    : null}
                </div>
                <div>
                    {(this.state.links.length !== 0) ?
                        <div>
                            <br/>
                            <br/>
                            <TableContainer component={Paper}>
                                <Table aria-label='simple table'>
                                    <TableHead>
                                        <TableRow className='tableHeader'>
                                            <TableCell> Username </TableCell>
                                            <TableCell> Link </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.links.map ((link) => (
                                            <TableRow className='tableRow' onClick={() => this.onClickRow(link.id)}>
                                                <TableCell> {link.username} </TableCell>
                                                <TableCell> {link.original} </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    : null}
                </div> <br/>
                <div className='errorText'> {this.state.message} </div>
            </div>
        )
    }
}

export default ShowLink