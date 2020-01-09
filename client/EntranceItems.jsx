import React from "react";
import items from "./dummyItems.jsx";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardImg,
  CardBody,
  CardLink,
  CardSubtitle
} from "reactstrap";

class EntranceItems extends React.Component {
  render() {
    console.log(items);
    return (
      <Row className="m-4 p-4">
        {items.map(one => {
          return (
            <Col sm="3">
              <Card className="my-2">
                <CardImg
                  top
                  width="100%"
                  src={one.photo}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle>{one.name}</CardTitle>
                  <CardSubtitle className="text-muted">Price : ${one.price}</CardSubtitle>
                  <CardText>{one.description}</CardText>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}

export default EntranceItems;
