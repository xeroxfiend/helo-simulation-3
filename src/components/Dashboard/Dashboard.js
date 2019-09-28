import React, {Component} from "react";
import "./dashboard.css";
import searchButton from "../../assets/searchbutton.png";
import axios from "axios";
import {connect} from "react-redux";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      search: "test",
      userPosts: true,
      posts: []
    };
  }

  componentDidMount() {
    this.getAllPosts();
    console.log(this.state);
  }

  getAllPosts() {
    axios.get(`/api/posts/${this.props.user_id}?userPosts=1`).then(res => {
        console.log(res.data)
      this.setState({
        ...this.state,
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
    console.log(value);
  }

  render() {
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
              onChange={e => this.handleFilter(e.target.value)}
              type="checkbox"
              className="filter"
            />
          </div>
        </div>
        <div className="posts-container">posts</div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {user_id} = reduxState;
  return {user_id};
}

export default connect(mapStateToProps)(Dashboard);
