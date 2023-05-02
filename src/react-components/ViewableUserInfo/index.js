import React from 'react';
import './styles.css';
import { getfavoriteThings, getfavoriteThingsToImages } from '../../userData.js';

import FavoriteThing from '../FavoriteThing';

export default class ViewableUserInfo extends React.Component {

  displayViewableBio() {
    return (
      <div id='viewableBio' className='bio'>
        <span className='breakLongWords'>{ this.props.user.bio }</span>
      </div>

    )
  }

  displayUneditableFavorites() {
    return (
      <div>
        {
          this.props.user.favoriteThings.map((f, index) => {
              return(<favoriteThing key={ index } setfavorites={ this.props.setfavorites } addable={ false } removable={ false } index={ index } name={ f } imgSrc={ getfavoriteThingsToImages()[f] }/>)
          })
        }
      </div>
    )
  }

  render(){
    const { firstName, lastName, username, profilePic, numFollowers, numFollowing, bio, favoriteThings } = this.props.user;

    return (
      <div id='userInfo'>
        { /* Need to pull image, name, username, list of followers, list of users following, bio */ }
        <div className='userInfoComponent' id='userInfoMain'>
          <img src={ profilePic } alt='profile pic'/>
          <h1>{ firstName + " " + lastName }</h1>
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
        <div className='userInfoComponent' id='favoriteThings'>
          { /* Need to pull favorite things here, and use the user's name */ }
          <h4>{ firstName + "'s favorites" }</h4>
          <div id='favoriteThingsContainer'>
            { this.displayUneditablefavorites() }
          </div>
        </div>
      </div>
    );
  }
}
