import React from "react";
import { Link } from "react-router-dom";
import Item from "./item.jsx"

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

var Posts = (props)=> (
    <div>
    {props.items?props.items.map(one => (
    <div key={one._id}>
      {/* <CardText tag={Link} to={"/" + one.user.username}>{one.user.firstname} {one.user.lastname}</CardText> */}
      <Card tag={Link} to={"items/" + one._id }
        key={one._id}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "8px"
        }}
      >
        <div style={{ flex: 4 }}>
          <img
            width="100%"
            src={"http://127.0.0.1:3000/api/uploads/" + one.photo}
            alt="Card image cap"
          />
        </div>
        <div style={{ flex: 6, marginLeft: "7px" }}>
          <CardTitle className="mb-1">{one.name}</CardTitle>
          <small className="text-muted">
          <CardText tag={Link} to={"/users/" + one.user.username}>{one.user.firstname} {one.user.lastname}</CardText>
          </small>
          <CardText>Description: {one.description}</CardText>
          <small className="text-muted">
            <span>Price: ${one.price}</span> &nbsp;&nbsp; <span>Availability: {one.available?"✔":"❌" }</span> &nbsp;&nbsp; <span>Quantity: {one.quantity}</span>
          </small>
        </div>
      </Card>
    </div>
  )): null}
  </div>)
export default Posts