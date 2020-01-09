import React from "react";
import http from "./http.jsx";
import Posts from './Posts.jsx';

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    http.get("/api/items/home", (err, products) => {
      this.setState({ products });
    });
  }

  render() {
    return (
      <div><div style={{marginRight : "200px"}}>

      </div>
      <div className="m-4 p-4">
          <Posts items={this.state.products} />
      </div></div>
    );
  }
}

export default Feed;
