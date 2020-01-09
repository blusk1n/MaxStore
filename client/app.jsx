import React from "react";
import ReactDOM from "react-dom";
import http from "./http.jsx";
import Home from "./home.jsx";
import Entrance from "./entrance.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: true,
      user : null
    };
  }
  componentDidMount(){
      this.rerender()
  }
  rerender() {
      http.get("/api/token", (err,data) => {
        if (!err && data.success) {
          this.setState({ token: true, user:data.user });
        } else {
          this.setState({ token: false,user:null });
        }
      });
  }
  render() {
    return (
      <div>
        {this.state.token ? (
          <Home user={this.state.user} rerender={this.rerender.bind(this)} />
        ) : (
          <Entrance rerender={this.rerender.bind(this)} />
        )}

      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
///
