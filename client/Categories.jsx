import React from "react";
import http from "./http.jsx";
import {Link} from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

class Categories extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    http.get("/api/categories", (err, categories) => {
      this.setState({ categories });
    });
  }

  render() {
      
    return (
      <Row>
        {this.state.categories.map(one => {
         return <Col tag={Link} to={"/categories/" + one.name} className="m-4" key={one._id} xs="6" sm="3">
            <div style={{ textAlign: "center" ,padding: "7px", border: "solid 1px blue", color:"rgb(100, 100, 255)"}}>
            {one.name}
            </div>
          </Col>;
        })}
      </Row>
    );
  }
}

export default Categories;
