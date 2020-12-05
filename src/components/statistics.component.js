import React from 'react';
import LinkService from '../services/link.service.js';
import AuthService from '../services/auth.service.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class Statistics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
            message: ''
        };
    }

    componentWillMount() {
        if (!AuthService.isLogined()) {
            this.props.history.push('/');
            window.location.reload();
        }
    }

    componentDidMount() {

        LinkService.getLinksByUsername()
        .then( response => {
            this.setState({links: response.data});
        })
        .catch((error) => {
            this.setState({message: error.response.data.message});
        })
    }

    sumCounter = () => {
        return this.state.links.reduce((prev, cur) => prev + cur.counter, 0)
    }

    onClickRow = (id) => {
        this.props.history.push('t/' + id);
    }

    render() {
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label='spanning table'>
                        <TableHead>
                            <TableRow className='tableHeader'>
                                <TableCell> Original link </TableCell>
                                <TableCell> Number of clicks </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.message ? 
                                <TableRow style={{backgroundColor:'#DC143C'}}>
                                    <TableCell align='right'> {this.state.message} </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                             : null}
                            {this.state.links.map((link) => (
                              <TableRow className='tableRow' onClick={() => this.onClickRow(link.id)}>
                                  <TableCell> {link.original} </TableCell>
                                  <TableCell> {link.counter} </TableCell>
                              </TableRow>  
                            ))}
                            <TableRow className='tableHeader'>
                                <TableCell align='right'> Number of clicks in total </TableCell>
                                <TableCell> {this.sumCounter()} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default Statistics