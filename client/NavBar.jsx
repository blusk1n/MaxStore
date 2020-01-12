import React, { useState } from "react";
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
const NavBar = props => {
    const [isOpen, setIsOpen] = useState(false);
    const [usedFor, setUsedFor] = useState("People");
  
    const toggle = () => setIsOpen(!isOpen);
    const { buttonLabel, className } = props;
    function search(){

    }
  
    
    
  
    function logOut() {
      localStorage.removeItem("token");
      props.rerender();
    }

return (

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
  <Nav className="mx-auto" navbar>
  
    <div className="input-group">
      <div className="input-group-prepend">
   
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {usedFor}
        </button>
        <div className="dropdown-menu">
          <p style={{cursor : "pointer"}} onClick={()=> setUsedFor("People")} className="dropdown-item">People</p>
          <p style={{cursor : "pointer"}} onClick={()=> setUsedFor("Products")} className="dropdown-item">Products</p>
        </div>
      </div>
      <input
        onKeyUp={()=>props.keyup(usedFor)}
        className=" barInput mr-sm-2"
        type="text"
        placeholder="  Search..."
        id="barInput"
        aria-label="Search"
        aria-label="Text input with dropdown button"
      />
    </div>
    {/* <NavItem>
      <Button>changeMe</Button>
    </NavItem>
    <NavItem>
      <Form class="form-inline">
        <Input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
      </Form>
    </NavItem> */}
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
</Navbar>)
}

export default NavBar;