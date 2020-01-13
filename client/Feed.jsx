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
      <div>
        <h3 className="text-muted py-2">Home</h3>
      <div style={{display:"flex" , flexDirection : "row", overflowY : "scroll" , maxHeight : "80vh"}}>
      <div style={{flex: 6}} className="my-2">
          {this.state.products.length == 0? <h3 className="text-muted py-2">Follow some people 😉</h3> :<Posts items={this.state.products} />}
      </div>
        <div style={{flex : 4}}></div>
      </div>
      </div>
    );
  }
}

export default Feed;
