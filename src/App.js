import React from 'react';
import './App.css';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Regestration from './components/regestration.component.js'
import LogIn from './components/login.component.js'
import Statistics from './components/statistics.component.js'
import CreateLink from './components/create.component.js'



class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <h1>shorter</h1>
            <div id="menuBar">
              <NavLink exact to="/" className="menuOption"> login </NavLink>
              <NavLink to="/regestration" className="menuOption"> sign up </NavLink>
              <NavLink to="/create" className="menuOption"> create link </NavLink>
              <NavLink to="/statistics" className="menuOption"> statistics </NavLink>

            </div>
          </header>
          <body>
            <div id="body">
            <Route exact path="/" component={LogIn}/>
            <Route path="/regestration" component={Regestration}/>
            <Route path="/create" component={CreateLink}/>
            <Route path="/statistics" component={Statistics}/>
            </div>
          </body>
        </div>
      </HashRouter>
    )
  }
}

export default App;
