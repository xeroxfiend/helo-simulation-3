import React, {Component} from 'react'
import './post.css'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            url: '',
            content: '',
            pic: '',
            username: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        // axios.get(`/api/post/${this.props.match.id}`)
    }


    render() {
        return (
            <div className="post-details">
                <div className="post-detail-container">
                <div className="new-post-container">
                    <h1 className="post-detail-title">{this.state.title}</h1>
                    <div className="invisible"></div>
                    </div>
                    <div className="title-container">
                        <h4 className="title-text">Title:</h4>
                        <input onChange={e => this.handleChange(e.target.value, 'title')} type="text" className="title-input"/>
                    </div>
                    <img src={this.state.url} alt="default" className="form-image"/>
                    <div className="url">
                        <h4 className="url-text">Image URL:</h4>
                        <input onChange={e => this.handleChange(e.target.value, 'url')} type="text" className="url-input"/>
                    </div>
                    <div className="content">
                        <h4 className="content-text">Content:</h4>
                        <textarea onChange={e => this.handleChange(e.target.value, 'content')} type="text" className="content-input"/>
                    </div>
                    <div className="post-button-container">
                        <div className="invisible2"></div>
                        <button onClick={() => this.handleSubmit()} className="post-button">Post</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Post)