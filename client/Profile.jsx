import React from "react";
import http from "./http.jsx";
import Posts from "./Posts.jsx";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      profile: false,
      user: {},
      modal: false,
      modalFor: "",
      modalUsers: []
    };
  }

  componentDidMount() {
    this.handleState();
  }

  handleState() {
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
    if (title) {
      http.get(`/api/users/${this.state.user._id}/${title}`, (err, data) => {
        this.setState({
          modal: !this.state.modal,
          modalFor: title,
          modalUsers: data
        });
      });
    } else
      this.setState({
        modal: !this.state.modal,
        modalFor: title,
        modalUsers: []
      });
  }
  componentWillReceiveProps() {
    setTimeout(() => this.handleState(), 0);
  }
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            margin: "20px 0",
            maxHeight: "85vh"
          }}
        >
          <div style={{ flex: 2, fontSize: "13pt" }}>
            <form className="image-upload" id="imageUpload">
              <label for="file-input">
                {/* <div className={this.state.profile?"container imageHoverable" : "container"}> */}
                <img
                  width="100%"
                  style={{ aspectRatio: 1, objectFit: "contain" }}
                  src={
                    this.state.user.photo
                      ? `/api/uploads/${this.state.user.photo}`
                      : "http://maidanapp.net/wp-content/themes/maidan/images/no_image.png"
                  }
                  alt="Card image cap"
                />
                {/* {this.state.profile?<div style={{fontSize: "10em",marginTop : "-14px", opacity: 0}} className="centered">+</div>: null} */}
                {/* </div> */}
              </label>

              {this.state.profile ? (
                <input
                  id="file-input"
                  type="file"
                  name="photo"
                  onChange={() => {
                    fetch(`/api/users/${this.state.user._id}/uploadImage`, {
                      method: "POST",
                      body: new FormData(
                        document.getElementById("imageUpload")
                      ),
                      headers: { authorization: localStorage.getItem("token") }
                    }).then(data => {
                      this.props.rerender();
                    });
                  }}
                />
              ) : null}
            </form>
            <div style={{textAlign : "center", fontSize : "11pt"}}>
              <div>
                <p>
                 {this.state.user.firstname}{" "}
                  {this.state.user.lastname}
                </p>
                <p>
                  <b>Bio:</b> {this.state.user.bio}
                </p>
                <p>
                  <b>Address:</b> {this.state.user.address}
                </p>
                <p>
                  <b>phone:</b> {this.state.user.phone}
                </p>
              </div>

              
              <p>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={this.toggleModel.bind(this, "Followers")}
                  className="clickable"
                >
                  Followers
                </span>
                &nbsp;&nbsp;
                <span
                  style={{ cursor: "pointer" }}
                  onClick={this.toggleModel.bind(this, "Followings")}
                  className="clickable"
                >
                  Followings
                </span>
              </p>
              {this.state.profile ? null : (
                <p
                  style={{ cursor: "pointer" }}
                  onClick={this.follow.bind(this)}
                >
                  {this.state.user.followed ? "unfollow" : "follow"}
                </p>
              )}
            </div>
          </div>
          <div style={{ flex: 7, marginLeft: "15px" }}>
            <h3 className="text-muted">Products</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                maxHeight: "75vh",
                overflowY: "scroll"
              }}
            >
              <div style={{ flex: 5 }}>
                {this.state.products.length == 0 ? (
                  <h5>No products yet 😢</h5>
                ) : (
                  <Posts items={this.state.products} />
                )}
              </div>
              <div style={{ flex: 1 }}></div>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        {/* <div style={{ margin: "10px 200px" }}>
          <Posts items={this.state.products} />
        </div> */}

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleModel.bind(this, null)}
        >
          <ModalHeader>{`${this.state.modalFor}`}</ModalHeader>
          <ModalBody>
            {this.state.modalUsers.map(one => {
              var element =
                one[
                  this.state.modalFor == "Followers" ? "follower" : "followed"
                ];
              return (
                <div key={element._id}>
                  <hr />
                  <Link
                    onClick={this.toggleModel.bind(this, null)}
                    to={"/users/" + element.username}
                  >
                    {element.firstname + " " + element.lastname}
                  </Link>
                </div>
              );
            })}
          </ModalBody>
          <ModalFooter>
            <Button
              color="secondary"
              onClick={this.toggleModel.bind(this, null)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Profile;
