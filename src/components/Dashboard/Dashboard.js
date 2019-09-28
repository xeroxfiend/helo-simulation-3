import React, {Component} from "react";
import "./dashboard.css";
import searchButton from "../../assets/searchbutton.png";
import axios from "axios";
import {connect} from "react-redux";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "",
      userPosts: true,
      posts: []
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.userPosts !== this.state.userPosts) {
      this.getAllPosts();
    }
  }

  getAllPosts() {
    const userPosts = this.state.userPosts ? 1 : 0;
    axios
      .get(`/api/posts/${this.props.user_id}?userPosts=${userPosts}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  ///probably wrong

  getPosts(user_id) {
    axios
      .get(
        `/api/posts/${user_id}?search=${this.state.search}&userPosts=${this.state.userPosts}`
      )
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  ///

  handleChange(value) {
    this.setState({
      search: value
    });
  }

  handleFilter(value) {
    this.setState({
      userPosts: value
    });
  }

  render() {
    const mappedPost = this.state.posts.map((el, i) => (
      <div data={el} key={i} className="post">
        <h2 className="content">{el.content}</h2>
        <h2 className="id">{el.user_id}</h2>
      </div>
    ));
    return (
      <div className="dashboard">
        <div className="search-container">
          <div className="input-and-buttons">
            <input
              onChange={e => this.handleChange(e.target.value)}
              placeholder="Search by Title"
              className="search-bar"
              type="text"
            />
            <img src={searchButton} alt="search" className="search-button" />
            <button className="reset">Reset</button>
          </div>
          <div className="filter-container">
            <h3 className="filter-text">My Posts</h3>
            <input
              checked={this.state.userPosts}
              onChange={e => this.handleFilter(e.target.checked)}
              type="checkbox"
              className="filter"
            />
          </div>
        </div>
        <div className="posts-container">{mappedPost}</div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {user_id} = reduxState;
  return {user_id};
}

export default connect(mapStateToProps)(Dashboard);
