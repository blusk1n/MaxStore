import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route} from "react-router-dom";
import Signup from './signup.jsx';
import Login from './login.jsx';
import EntranceItems from './EntranceItems.jsx';
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

const Entrance = (props) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen);
  return (
    <Router>
      <Navbar fixed={"top"} color="light" light expand="md">
        <NavbarBrand tag={Link} to="">Max</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="rightNav ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/signup">signup</NavLink>
            </NavItem>
            <NavItem>
            <NavLink tag={Link} to="/login">login</NavLink>
            </NavItem>
          </Nav>
          {/* <NavbarText>Simple Text</NavbarText> */}
        </Collapse>
      </Navbar>
            <div className="my-4 py-4"></div>

            <Route path="/" exact component={EntranceItems}/>
            <Route path="/login" exact  component={(prop)=> <Login prop={prop} rerender={props.rerender} />}/>
            <Route path="/signup" exact component={()=> <Signup rerender={props.rerender} />}/>
    </Router>
  );
}

export default Entrance;
//