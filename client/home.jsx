import React, { useState } from "react";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import {
  Collapse,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  Col,
  Row
} from "reactstrap";

const Home = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggleModel = () => setModal(!modal);
  function logOut() {
    localStorage.removeItem("token");
    props.rerender();
  }
  return (
    <Router>
      <Navbar fixed={"top"} color="light" light expand="md">
        <NavbarBrand tag={Link} to="">
          Max
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink tag={Link} to="signup">signup</NavLink>
            </NavItem> */}

            <NavItem>
              <NavLink tag={Link} to="profile">
                Profile
              </NavLink>
            </NavItem>
          </Nav>
          <Nav className="rightNav ml-auto" navbar>
            {/* <NavItem>
              <NavLink tag={Link} to="signup">signup</NavLink>
            </NavItem> */}
            <NavItem>
              <NavLink tag={Link} to="" onClick={logOut}>
                Logout
              </NavLink>
            </NavItem>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
      <div style={{ display: "flex", marginTop: "60px" }}>
        <div style={{ flex: 1 }}>
          {/* <p>List Based</p> */}
          <Nav vertical>
            <NavItem>
              <NavLink style={{cursor : "pointer"}} onClick={toggleModel}>Add New Product</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Another Link</NavLink>
            </NavItem>
            <NavItem>
              <NavLink disabled href="#">
                Disabled Link
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div style={{ flex: 4 }}>
          <Switch>
            <Route path="/" exact component={() => <Feed />} />
            <Route
              path="/profile"
              exact
              component={() => <Profile user={props.user} />}
            />
            <Route exact path={props.user ? "/" + props.user.username : "/"}>
              <Redirect to="/profile" />
            </Route>

            <Route exact path="/users/:username"  component={Profile} />
            <Route exact path="/items/:itemId"  component={Profile} />

          </Switch>
        </div>
        {/* <div style={{ flex: 2 }}></div> */}
      </div>

      <div>
        <Modal isOpen={modal} toggle={toggleModel} className={className}>
          <ModalHeader toggle={toggleModel}>Add New Product</ModalHeader>
          <ModalBody>
            <Form id="addProductForm">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="What you call your product?"
                />
              </FormGroup>

              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" />
              </FormGroup>

              <Row form>
                <Col md={4}>
                  <FormGroup>
                    <Label for="price">Price</Label>
                    <Input
                      type="number"
                      name="price"
                      id="price"
                      placeholder="Price"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input
                      type="number"
                      name="quantity"
                      id="quantity"
                      placeholder="Quantity"
                    />
                  </FormGroup>
                </Col>
                <Col className="pl-4 pb-4" md={4}>
                  <FormGroup className="align-middle">
                    <p className="align-middle">available</p>
                    <Label for="available" className="switch">
                      <Input
                        type="checkbox"
                        name="available"
                        id="available"
                      />
                      <span className="slider round"></span>
                    </Label>
                  </FormGroup>
                </Col>
              </Row>

              {/* <FormGroup>
      <Label for="category">Categoy</Label>
      <Input type="select" name="category" id="category">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Input>
    </FormGroup> */}

              <FormGroup>
      <Label for="photo">Add Picture</Label>
      <Input type="file" name="photo" id="photo" />
    </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                toggleModel();
                var available = document.getElementById("addProductForm").elements.available
                available.value = available.checked
                // console.log([].slice.call(document.getElementById("addProductForm").elements).map(one =>{
                //   return {[one.name] : one.value}
                // }))
                console.log(document.getElementById("photo").files[0])
              //   fetch("/api/items", {
              //     method : "POST",
              //     body : new FormData(document.getElementById("addProductForm")),
              //     headers: {"authorization" : localStorage.getItem("token")}
              // })
                
              }}
            >
            Submit
            </Button>{" "}
            <Button color="secondary" onClick={toggleModel}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </Router>
  );
};

export default Home;
//


