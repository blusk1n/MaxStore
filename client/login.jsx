import React from "react";
import { Link } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";
import http from "./http.jsx";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      msg: null
    };
  }

  submitForm() {
    var form = document.getElementById("loginForm");
    if (form.checkValidity()) {
      var json = {};
      [].slice.call(form.elements).forEach(one => {
        json[one.name] = one.value;
      });
      http.post("/api/users/authenticate", json, data => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          this.props.rerender()
        } else {
          this.setState({ msg: data.msg, alert: true });
          setTimeout(() => {
            this.setState({ alert: false, msg: null });
          }, 3000);
        }
      });
    } else {
      this.setState({ alert: true });
      setTimeout(() => {
        this.setState({ alert: false });
      }, 3000);
    }
  }

  render() {
    return (
      <div>
        {this.state.alert ? (
          <Alert color="danger">{this.state.msg ? this.state.msg : "Please fill all fields"}</Alert>
        ) : null}
        <Form id="loginForm" className="m-4 p-4">
          <Row form>
            <Col md={12}>
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

            <Col md={12}>
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
          </Row>
          <Button tag={Link} to="" className="btn-block" onClick={this.submitForm.bind(this)}>
            <p style={{
              fontSize: 20,
              margin: 5
            }}>
              Log in
            </p>
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
