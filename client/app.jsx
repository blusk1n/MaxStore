import React from 'react';
import ReactDOM from 'react-dom';
import http from './http.jsx';
import Home from './home.jsx';
import Entrance from './entrance.jsx';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
window.http = http 

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            token : null
        }
    }
    render(){
        return (
        <div>
            {this.state.token? <Home /> : <Entrance />}
        {/* <Router>
            <Link to="/home">
                <li>Home</li>
            </Link>
            <Link to="/login">
                <li>Entrance</li>
            </Link>
            {<Route path="/home" exact component={Home}/>
            <Route path="/login" exact component={Entrance}/>}
        </Router>     */}
        </div>
        )
    }
}


ReactDOM.render(<App /> , document.getElementById("container"))
///
