import React, {Component} from 'react'
import './form.css'
import imageDefault from '../../assets/imageDefault.JPG'
import {connect} from 'react-redux'
import axios from 'axios'

class Form extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            url: '',
            content: ''
        }
    }

    handleChange(value, key) {
        this.setState({
            [key]: value
        })
    }

    handleSubmit() {
        axios.post(`/api/post/${this.props.user_id}`, {
            title: this.state.title,
            url: this.state.url,
            content: this.state.content
        }).then(() => {
            this.props.history.push('/dashboard')
        })
    }


    render() {
        return (
            <div className="form">
                <div className="form-container">
                    <div className="new-post-container">
                    <h1 className="new-post">New Post</h1>
                    <div className="invisible"></div>
                    </div>
                    <div className="title-container">
                        <h4 className="title-text">Title:</h4>
                        <input onChange={e => this.handleChange(e.target.value, 'title')} type="text" className="title-input"/>
                    </div>
                    <img src={this.state.url ? this.state.url : imageDefault} alt="default" className="form-image"/>
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

function mapStateToProps(reduxState) {
    const {user_id} = reduxState
    return {user_id}
}

export default connect(mapStateToProps)(Form)