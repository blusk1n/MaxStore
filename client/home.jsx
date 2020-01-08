import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
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
} from 'reactstrap';

const Home = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  function logOut(){
    localStorage.removeItem("token")
    props.rerender()
  }
  return (
    <Router>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="">Max</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="rightNav ml-auto" navbar>
            {/* <NavItem>
              <NavLink tag={Link} to="signup">signup</NavLink>
            </NavItem> */}
            <NavItem>
            <NavLink tag={Link} to="" onClick={logOut}>Logout</NavLink>
            </NavItem>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
            {/* <Route path="/login" exact  component={()=> <Login rerender={props.rerender} />}/> */}
            {/* <Route path="/signup" exact component={Signup}/> */}
    </Router>
  );
}

export default Home;
//