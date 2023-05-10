import React from 'react';
import './styles.css';

import SmallProfileBar from '../../react-components/SmallProfileBar';

export default class PostSearchBar extends React.Component {
  state = {
    query: '',
    matchedUsers: [],
  }

  handleInput(e) {
    this.setState({ query: e.target.value }, this.setMatchedUsers);
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
    this.setMatchedUsers();
   
  }

  setMatchedUsers() {
    fetch(`/api/users/search?s=${this.state.query}&max=${10}`)
    .then(res => res.json())
    .then(json => {
      this.setState({matchedUsers: json})
    })

  }

  removeUser(uid) {
    fetch(`/api/users/${uid}`, {
      method: "delete"
    })
    .then(() =>{
      this.setMatchedUsers()
    });
  }

  render() {
    return (
      <div className='adminSearchBar'>
        <div className='searchSettings'>
          <input autoComplete='off' onKeyUp={ this.handleInput.bind(this) } type='text' placeholder='Search for a user...' />
        </div>

        {
          this.state.matchedUsers.map((user, i) => {
            console.log(user)
            return (
              <SmallProfileBar uid={ user._id } user={ user } key={i} removeUser={this.removeUser.bind(this)} canUnfollow={ false } name={user.firstname + " " + user.lastname } username={ user.username } imgSrc={ user.profilePic ? user.profilePic.image_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' } />
            )
          })
        }
      </div>

    );
  }
}
