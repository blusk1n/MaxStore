import React from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Link } from "react-router-dom";
import http from "./http.jsx";
class Signup extends React.Component {

  constructor() {
    super()
    this.state = {
      alert: false
    }
  }

  submitForm() {
    var form = document.getElementById("signupForm")
    if (form.checkValidity()) {
      var json = {};
      [].slice.call(form.elements).forEach(one => {
        json[one.name] = one.value
      })
      http.post("/api/users", json, data => {
        http.post("/api/users/authenticate", json, data => {
          localStorage.setItem("token", data.token);
          this.props.rerender()

        });
      })
    } else {
      this.setState({ alert: true })
      setTimeout(() => {
        this.setState({ alert: false })
      }, 3000)
    }
  }

  render() {
    return (<div>

      {this.state.alert ? <Alert color="danger">
        Please fill all fields
    </Alert> : null}
      <Form id="signupForm" className="m-4 p-4">
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="username">User name</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="firstname">First name</Label>
              <Input
                type="text"
                name="firstname"
                id="firstname"
                placeholder="firstname"
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="lastname">Last name</Label>
              <Input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="lastname"
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="with a placeholder"
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
              />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="passwordConfirmation">Confirm password</Label>
              <Input
                type="password"
                name="password"
                id="passwordConfirmation"
                placeholder="confirm password"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            placeholder="address"
            required
          />
        </FormGroup>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="phone">Phone number</Label>
              <Input type="text" name="phone" id="phone" placeholder="phone number" required />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="gender">Gender</Label>
              <Input type="select" defaultValue="None" name="gender" id="gender">
                <option>Male</option>
                <option>Female</option>
                <option >None</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="birthdate">Birth date</Label>
              <Input
                type="date"
                name="birthdate"
                id="birthdate"
                placeholder="date placeholder"
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="bio">Bio</Label>
              <Input type="textarea" name="bio" id="bio" required />
            </FormGroup>
          </Col>
        </Row>
        <Button className="btn-block" tag={Link} to="" onClick={this.submitForm.bind(this)}>
          <p style={{
            fontSize: 20,
            margin: 5
          }}>Sign up
            </p></Button>
      </Form>
    </div>
    );
  }
}

export default Signup;
