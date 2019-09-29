import React, {Component} from "react";
import "./post.css";
import axios from "axios";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      url: "",
      content: "",
      pic: "",
      username: ""
    };
  }

  componentDidMount() {
    axios.get(`/api/post/${this.props.match.id}`).then(result => {
      console.log(result);
      // this.setState({
      //     title: result.data.title,
      //     url: result.data.url,
      //     content: result.data.content,
      //     pic: result.data.pic,
      //     username: result.data.username
      // })
    });
  }

  render() {
    return (
      <div className="post-details">
        <div className="post-detail-container">
          <div className="new-post-container">
            <h1 className="post-detail-title">{this.state.title}</h1>
            <div className="invisible"></div>
          </div>
          <img src={this.state.url} alt="default" className="form-image" />
        </div>
      </div>
    );
  }
}

export default Post;
