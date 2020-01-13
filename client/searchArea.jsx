import React from "react";
import Posts from "./Posts.jsx";
import {Link} from "react-router-dom";

class SearchArea extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.props.searchProducts ? (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ flex: 6 }} className="m-4 p-4">
              <Posts items={this.props.searchProducts} />
            </div>
            <div style={{ flex: 4 }}></div>
          </div>
        ) : null}
        {this.props.searchUsers
          ? this.props.searchUsers.map((one, i) => {
              return (
                <div key={one._id} style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ flex: 6 }} className="m-4 p-4">
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
                            one.photo
                              ? one.photo
                              : "http://maidanapp.net/wp-content/themes/maidan/images/no_image.png"
                          }
                          alt="Card image cap"
                        />
                      </div>
                      <div style={{ flex: 4, marginLeft: "7px" }}>
                        <p>
                          <b> Name:</b> <Link to={"/users/" + one.username}>{one.firstname} {one.lastname}</Link> 
                        </p>
                        <p>
                          <b>Bio:</b> {one.bio}
                        </p>
                        <p>
                          <b>Address:</b> {one.address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ flex: 4 }}></div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default SearchArea;
