import React, { useState } from "react";
import Profile from "./Profile.jsx";
import Feed from "./Feed.jsx";
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";

const Home = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  function logOut() {
    localStorage.removeItem("token");
    props.rerender();
  }
  return (
    <Router>
      <Navbar color="light" light expand="md">
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
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p>List Based</p>
          <Nav vertical>
            <NavItem>
              <NavLink href="#">Link</NavLink>
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
          <hr />
          <p>Link based</p>
          <Nav vertical>
            <NavLink href="#">Link</NavLink> <NavLink href="#">Link</NavLink>{" "}
            <NavLink href="#">Another Link</NavLink>{" "}
            <NavLink disabled href="#">
              Disabled Link
            </NavLink>
          </Nav>
        </div>
        <div style={{ flex: 5 }}>
          <Switch>
            <Route
              path="/profile"
              exact
              component={() => <Profile user={props.user} />}
            />
            <Route exact path={props.user ? "/" + props.user.username : "/"}>
              <Redirect to="/profile" />
            </Route>
            <Route path="/" exact component={() => <Feed />} />
            
            <Route path="/:username" exact component={Profile} />
          </Switch>
        </div>
        {/* <div style={{ flex: 2 }}></div> */}
      </div>
    </Router>
  );
};

export default Home;
//
