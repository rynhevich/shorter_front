import React from 'react';
import './App.css';
import { Route, NavLink, HashRouter } from "react-router-dom";
import CreateLink from './components/create.component.js'
import Link from './components/link.component.js'
import Routes from './routes.js'
import RepresentationService from './services/representation.service.js'




class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        id: ''
    };
}

  handleId = (id) => {
    this.setState({id: id});
  }

  componentDidMount() {
    RepresentationService.showNavbar()
}


  render() {
    return (
      <HashRouter>
        <div className='App'>
          <header className='App-header'>
            <h1>shorter</h1>
            <div id='menuBar'>
              <div id='preAuth'>
                <NavLink exact to='/' className='menuOption'> login </NavLink>
                <NavLink to='/regestration' className='menuOption'> sign up </NavLink>
              </div>
              <div id='postAuth'>
                <NavLink to='/create' className='menuOption'> create link </NavLink>
                <NavLink to='/statistics' className='menuOption'> statistics </NavLink>
                <NavLink to='/logout' className='menuOption'> logout </NavLink>
              </div>

            </div>
          </header>
          <body>
            <div id='body'>
            <Route path='/create' render={(props) => <CreateLink {...props} onCreateLink={this.handleId}/>}/>
            <Route path='/l' render={(props) => <Link {...props} id={this.state.id}/>}/>
            {Routes}
            </div>
          </body>
        </div>
      </HashRouter>
    )
  }
}

export default App;
