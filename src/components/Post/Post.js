import React, {Component} from "react";
import "./post.css";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      image: "",
      content: "",
      pic: "",
      name: ""
    };
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.match.params.postid}`).then(result => {
      this.setState({
        title: result.data[0].title,
        url: result.data[0].url,
        content: result.data[0].content,
        image: result.data[0].image,
        name: result.data[0].name,
        pic: result.data[0].pic
      });
    });
  }

  render() {
    return (
      <div className="post-details">
        <div className="post-detail-container">
            <div className="head">
          <h1 className="post-detail-title">{this.state.title}</h1>
          <div className="user-stuff">
            <h3 className="user-head">by {this.state.name}</h3>
            <img
              className="post-pic-detail"
              src={this.state.pic}
              alt="post"
            />
            </div>
          </div>
          <div className="main-post">
          <img src={this.state.image} alt="post" className="post-image-detail"/>
          <h2 className="content-post">{this.state.content}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
