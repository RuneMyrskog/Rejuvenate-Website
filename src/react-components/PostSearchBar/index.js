import React from 'react';
import './styles.css';

import PostList from "../../react-components/PostList";

export default class PostSearchBar extends React.Component {
  state = {
    query: '',
    matchedPosts: [],
    posts: [],
    comments: []
  }

  handleInput(e) {
    this.setState({ query: e.target.value }, this.setMatchedPosts);
  }

  isChildOf(element, potentialParent) {
    while (element.parentNode != null) {
      if (element.parentNode === potentialParent) {
        return true;
      }
      element = element.parentNode
    }

    return false;
  }

  componentDidMount() {
    // Initialize posts and comments
     const users = [];
    const posts = [];
    const comments = [];


    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < users[i].posts.length; j++) {
        posts.push(users[i].posts[j]);
        for (let k = 0; k < users[i].posts[j].comments.length; k++) {
          comments.push(users[i].posts[j].comments[k]);
        }
      }
    }

    for (let i = 0; i < posts.length; i++) {
      posts[i].pid = i;
    }

    for (let i = 0; i < comments.length; i++) {
      comments[i].cid = i;
    }

    this.setState({ posts: posts, matchedPosts: posts, comments: comments });
  }

  setMatchedPosts() {
    const matchedPosts = this.state.posts.filter(post => {
      if (post.content.text.toLowerCase().includes(this.state.query.toLowerCase())) {
        return true;
      }

      for (let i = 0; i < post.comments.length; i++) {
        if (post.comments[i].comment.toLowerCase().includes(this.state.query.toLowerCase())) {
          return true
        }
      }
    })

    matchedPosts.map(post => {
      for (let i = 0; i < post.comments.length; i++) {
        if (!this.state.comments.includes(post.comments[i])) {
          post.comments.splice(post.comments.indexOf(post.comments[i]), 1);
        }
      }
    });

    this.setState({matchedPosts: matchedPosts});
  }

  removePost(pid) {
    const posts = this.state.posts;
    let i = 0;
    while (this.state.posts[i].pid !== pid) {
      i++;
    }
    posts.splice(i, 1);
    this.setState({ posts: posts }, this.setMatchedPosts.bind(this));
  }

  removeComment(cid) {
    const comments = this.state.comments;
    let i = 0;
    console.log(this.state)
    while (this.state.comments[i].cid !== cid) {
      i++;
    }
    comments.splice(i, 1);
    this.setState({ comments: comments }, this.setMatchedPosts.bind(this));
  }

  render() {
    return (
      <div className='adminSearchBar'>
        <div className='searchSettings'>
          <input autocomplete='off' onKeyUp={ this.handleInput.bind(this) } type='text' placeholder='Search for a post or comment...' />
        </div>

        <PostList removable={ true } removePost={ this.removePost.bind(this) } removeComment={ this.removeComment.bind(this) } posts={ this.state.matchedPosts } listComponent={ this }/>
      </div>

    );
  }
}
