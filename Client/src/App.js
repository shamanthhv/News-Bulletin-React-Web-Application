import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navigationbar from "./Navigationbar.js"
import Newsarticlehome from "./Newsarticlehome.js"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./Home.js"
import World from './World';
import Business from './Business';
import Politics from './Politics'
import Technology from './Technology'
import Sports from './Sports'
import Search from './Search'
import Detail from './Detail'
import Bookmark from './Bookmark'
class App extends React.Component{
  render(){
    return (
      <div>

          <Switch>
          
              <Route path="/" component={Home} exact />
              <Route path="/world" component={World}/>
              <Route path="/business" component={Business}/>
              <Route path="/politics" component={Politics}/>
              <Route path="/technology" component={Technology}/>
              <Route path="/sports" component={Sports}/>
              <Route path="/search" component={Search}/>
              <Route path="/detail" component={Detail}/>
              <Route path="/bookmark" component={Bookmark}/>
         
          </Switch>
      </div>
    )
  }
 
}

export default App;
