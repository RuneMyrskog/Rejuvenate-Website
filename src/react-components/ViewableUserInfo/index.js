import React from 'react';
import './styles.css';
import LoadingDisplay from "../../react-components/LoadingDisplay";
import FavoriteThing from '../FavoriteThing';

export default class ViewableUserInfo extends React.Component {

  constructor(props) {
    super(props)
  }

  displayViewableBio() {
    return (
      <div id='viewableBio' className='bio'>
        <span className='breakLongWords'>{ this.props.user.bio }</span>
      </div>

    )
  }

  render(){
    if (this.props.user === null) { //post failed to load, return null to not display this post
      return <LoadingDisplay />;
    } 
    //console.log("USERESLDF: " + this.props.user)
    const { firstname, lastname, username, profilePicture, bio, favoriteThings } = this.props.user;

    return (
      <div id='userInfo'>
        { /* Need to pull image, name, username, list of followers, list of users following, bio */ }
        <div className='userInfoComponent' id='userInfoMain'>
          <img id="leftProfilePicture" src={
            profilePicture ?
              profilePicture.image_url
              : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
          } alt="profile pic" />
          <h1>{ firstname + " " + lastname }</h1>
          <h3>@{ username }</h3>
          <div onClick={ this.props.toggleFollow } id='bigProfileButton'>{ this.props.canFollow ? 'Follow' : 'Unfollow' }</div>
          {/*
            <ul>
            <li><b>Followers</b><br /><span className='follow-amount'>{ numFollowers }</span></li>
            <li><b>Following</b><br /><span className='follow-amount'>{ numFollowing }</span></li>
          </ul>
          */}
          { this.displayViewableBio() }
        </div>
      </div>
    );
  }
}
