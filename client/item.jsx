import React from "react";
import http from "./http.jsx";
import { Link } from "react-router-dom";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button
  } from "reactstrap";



class Item extends React.Component {

    constructor() {
        super()
        this.state = {
            item: {}
        }
    }

    componentDidMount() {
        http.get(`/api/items/${this.props.match.params.itemId}`, (err, item) => {
            if (err) console.log(err)
            else {
                console.log(item)
                this.setState({item})
            }
        })
    }

    render() {
        return (
           this.state.item.user? <Card
        key={this.state.item._id}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "8px"
        }}
      >
        <div style={{ flex: 4 }}>
          <img
            width="100%"
            src={"http://127.0.0.1:3000/api/uploads/" + this.state.item.photo}
            alt="Card image cap"
          />
        </div>
        <div style={{ flex: 6, marginLeft: "7px" }}>
          <CardTitle tag={Link} to={"items/" + this.state.item._id } className="mb-1">{this.state.item.name}</CardTitle>
          <br/>
          <small className="text-muted">
          <CardText tag={Link} to={"/users/" + this.state.item.user.username}>{this.state.item.user.firstname} {this.state.item.user.lastname}</CardText>
          </small>
          <CardText>Description: {this.state.item.description}</CardText>
          <small className="text-muted">
            <span>Price: ${this.state.item.price}</span> &nbsp;&nbsp; <span>Availability: {this.state.item.available?"✔":"❌" }</span> &nbsp;&nbsp; <span>Quantity: {this.state.item.quantity}</span>
          </small>
        </div>
      </Card> : null
        );
    }
}

export default Item;
