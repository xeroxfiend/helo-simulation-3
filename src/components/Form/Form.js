import React, {Component} from 'react'
import './form.css'
import imageDefault from '../../assets/imageDefault.JPG'

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


    render() {
        return (
            <div className="form">
                <div className="form-container">
                    <h1 className="new-post">New Post</h1>
                    <div className="title">
                        <h4 className="title-text">Title:</h4>
                        <input onChange={e => this.handleChange(e.target.value, 'title')} type="text" className="title-input"/>
                    </div>
                    <img src="" alt="" className="form-image"/>
                    <div className="url">
                        <h4 className="url-text">Image URL:</h4>
                        <input onChange={e => this.handleChange(e.target.value, 'url')} type="text" className="url-input"/>
                    </div>
                    <div className="content">
                        <h4 className="content-text">Content:</h4>
                        <input onChange={e => this.handleChange(e.target.value, 'content')} type="text" className="content-input"/>
                    </div>

                </div>
            </div>
        )
    }
}


export default Form