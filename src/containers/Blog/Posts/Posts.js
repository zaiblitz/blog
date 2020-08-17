import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';

import './Posts.css';
import Post from '../../../components/Post/Post';

class Posts extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return { ...post, author: 'Merwin' }
                });
                this.setState({ posts: updatedPosts })
            })
            .catch(error => {
                console.log(error);
                //this.setState({error: true});
            });
    }

    postSelectedHandler = (id) => {
        //this.setState({ selectedPostID: id });
        this.props.history.push({pathname: '/' + id});
    }

    render() {

        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>;
        if (!this.state.error) {
            posts = this.state.posts.map((post, index) => {
                return (
                    // <Link to={'/' + post.id} key={index}>
                        <Post
                            key={index}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>
                )
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;