import React, {Component} from "react";
import "./dashboard.css";
import searchButton from "../../assets/searchicon.png";
import axios from "axios";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

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

  //   getPosts(user_id) {
  //     axios
  //       .get(
  //         `/api/posts/${user_id}?search=${this.state.search}&userPosts=${this.state.userPosts}`
  //       )
  //       .then(res => {
  //         this.setState({
  //           posts: res.data
  //         });
  //       });
  //   }

  ///

  handleChange(value) {
    this.setState({
      search: value
    });
    this.handleSearch();
  }

  handleFilter(value) {
    this.setState({
      userPosts: value
    });
  }

  handleReset() {
    this.getAllPosts();
    this.setState({
      search: ""
    });
  }

  handleSearch() {
    const userPosts = this.state.userPosts ? 1 : 0;
    axios
      .get(
        `/api/posts/${this.props.user_id}?userPosts=${userPosts}&search=${this.state.search}`
      )
      .then(res => {
        this.setState({
          posts: res.data
        });
      });
  }

  render() {
    const mappedPost = this.state.posts.map((el, i) => (
      <Link className='post' to={`/post/${el.post_id}`}>
        <div data={el} key={i}className='overall-post-container'>
          <h2 className="title">{el.title}</h2>
          <div className="user">
            <h4 className="post-user-name">by {el.name}</h4>
            <img src={el.pic} alt="user" className="post-user-image" />
          </div>
        </div>
      </Link>
    ));
    return (
      <div className="dashboard">
        <div className="search-container">
          <div className="input-and-buttons">
            <input
              value={this.state.search}
              onChange={e => this.handleChange(e.target.value)}
              placeholder="Filter by Title"
              className="search-bar"
              type="text"
            />
            <img
              onClick={() => this.handleSearch()}
              src={searchButton}
              alt="search"
              className="search-button"
            />
            <button onClick={() => this.handleReset()} className="reset">
              Reset
            </button>
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
