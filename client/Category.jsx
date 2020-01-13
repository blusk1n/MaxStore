import React from "react";
import Posts from "./Posts.jsx";
import http from "./http.jsx";


class Category extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            products : []
        }
    }
    componentDidMount() {
        http.get(`/api/categories/${this.props.match.params.name}/items`, (err, products) => {
          this.setState({ products });
        });
      }
    render(){
        return <div>
        <h3 className="text-muted py-2">{this.props.match.params.name}</h3>
      <div style={{display:"flex" , flexDirection : "row", overflowY : "scroll" , maxHeight : "80vh"}}>
      <div style={{flex: 6}} className="m-4 p-4">
          <Posts items={this.state.products} />
      </div>
        <div style={{flex : 4}}></div>
      </div>
      </div> 
            
        }
}

export default Category