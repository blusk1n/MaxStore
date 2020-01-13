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
      <div style={{display:"flex" , flexDirection : "row"}}>
      <div style={{flex: 6}} className="m-4 p-4">
          <Posts items={this.state.products} />
      </div>
        <div style={{flex : 4}}></div>
      </div>
    );
  }
}

export default Feed;
