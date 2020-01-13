import React from "react";
import http from "./http.jsx";
import Posts from "./Posts.jsx";
import {Link} from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      profile: false,
      user: {},
      modal: false,
      modalFor : "",
      modalUsers : []
    };
  }

  componentDidMount() {
    this.handleState()
  }

  handleState(){
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

  follow() {
    http.get(`/api/users/${this.state.user._id}/follow`, (err, data) => {
      this.componentDidMount();
    });
  }
  toggleModel(title) {
    if(title){
      http.get(`/api/users/${this.state.user._id}/${title}`, (err, data) => {
        this.setState({ modal: !this.state.modal, modalFor: title, modalUsers : data});
      });

    }else this.setState({ modal: !this.state.modal, modalFor: title, modalUsers : []});
  }
  componentWillReceiveProps(){
    setTimeout(()=>this.handleState(), 0)
    
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
              src={
                this.state.user.photo
                  ? this.state.user.photo
                  : "http://maidanapp.net/wp-content/themes/maidan/images/no_image.png"
              }
              alt="Card image cap"
            />
          </div>
          <div style={{ flex: 6, marginLeft: "7px" }}>
            <p>
              <b> Name:</b> {this.state.user.firstname}{" "}
              {this.state.user.lastname}
            </p>
            <p>
              <b>Bio:</b> {this.state.user.bio}
            </p>
            <p>
              <b>Address:</b> {this.state.user.address}
            </p>

            {this.state.profile ? null : (
              <p style={{ cursor: "pointer" }} onClick={this.follow.bind(this)}>
                {this.state.user.followed ? "unfollow" : "follow"}
              </p>
            )}
            <p>
              <span style={{cursor : "pointer"}} onClick={this.toggleModel.bind(this,"Followers")}>Followers</span>
              &nbsp;&nbsp;
              <span style={{cursor : "pointer"}} onClick={this.toggleModel.bind(this, "Followings")}>Followings</span>
            </p>
          </div>
        </div>
        <hr />
        <h3>Products: </h3>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 6 }} className="m-4 p-4">
            <Posts items={this.state.products} />
          </div>
          <div style={{ flex: 4 }}></div>
        </div>
        {/* <div style={{ margin: "10px 200px" }}>
          <Posts items={this.state.products} />
        </div> */}

        <Modal isOpen={this.state.modal} toggle={this.toggleModel.bind(this, null)}>
          <ModalHeader>
            {`${this.state.modalFor}`}
          </ModalHeader>
          <ModalBody>
            {this.state.modalUsers.map(one =>{
              var element = one[this.state.modalFor == "Followers"? "follower" : "followed"]
              return <div key={element._id}><hr /><Link onClick={this.toggleModel.bind(this, null)} to={"/users/" + element.username} >{element.firstname + " " + element.lastname}</Link></div>
            })}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModel.bind(this, null)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Profile;
