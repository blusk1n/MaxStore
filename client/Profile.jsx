import React from "react";
import http from "./http.jsx";
import Posts from "./Posts.jsx";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      profile: false,
      user: {}
    };
  }

  componentDidMount() {
    if (this.props.user) {
      http.get(
        `/api/users/${this.props.user.username}/items`,
        (err, { products, user }) => {
          this.setState({ products, profile: true, user });
        }
      );
    } else {
      if (this.props.match) {
        http.get(
          `/api/users/${this.props.match.params.username}/items`,
          (err, { products, user }) => {
            this.setState({ products, profile: false, user });
          }
        );
      }
    }
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "20px"
          }}
        >
          <div style={{ flex: 2 }}>
            <img
              width="100%"
              src={this.state.user.photo}
              alt="Card image cap"
            />
          </div>
          <div style={{ flex: 8, marginLeft: "7px" }}>
            <CardTitle>
              Name: {this.state.user.firstname} {this.state.user.lastname}
            </CardTitle>
            <CardText>Description: {this.state.user.description}</CardText>
            <small className="text-muted">
              <span>Price: ${this.state.user.price}</span> &nbsp;&nbsp;{" "}
              <span>
                Availability: {this.state.user.available ? "✔" : "❌"}
              </span>{" "}
              &nbsp;&nbsp; <span>Quantity: {this.state.user.quantity}</span>
            </small>
          </div>
        </div>
        <hr/>
        <h3>Products: </h3>
        <div style={{margin: "10px 200px"}}>
          <Posts items={this.state.products} />
        </div>
      </div>
    );
  }
}

export default Profile;
