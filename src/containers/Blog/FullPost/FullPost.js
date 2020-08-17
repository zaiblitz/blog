import React, { Component } from 'react';

import './FullPost.css';
import axios from 'axios';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidMount() {
        console.log(this.props);
        const postID = this.props.match.params.id;
        console.log(postID);
        if (postID) {
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== postID)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + postID)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    })
                    .catch(error => {
                        console.log('error');
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;

        if(this.props.id) {
            post = <p style={{textAlign: "center"}}>Loading...</p>;
        }

        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClickCapture={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );            
        }
        return post;
    }
}

export default FullPost;