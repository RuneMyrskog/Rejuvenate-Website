import React from 'react';
import './styles.css';
import LoadingDisplay from "../../react-components/LoadingDisplay";

export default class ViewableUserInfo extends React.Component {

  constructor(props) {

   
    super(props)
    this.handleFollow = props.app.follow.bind(props.app);
    this.handleUnfollow = props.app.unfollow.bind(props.app);

  }

  unfollowButton() {
    return (
      <div onClick={() => this.handleUnfollow(this.props.user)} id='bigProfileButton' >Unfollow</div >
    )
  }

  followButton () {
    return (
      <div onClick={() => this.handleFollow(this.props.user)} id='bigProfileButton' >Follow</div >
    )
  }
  followUnfollowButton() {
    console.log()
    let followed = this.props.app.state.following.findIndex(curruser => curruser._id == this.props.user._id) != -1;
    return followed ? this.unfollowButton() : this.followButton()
  }

  displayViewableBio() {
    let bio = this.props.user.bio;
    if (bio == "" || bio == null) {
      bio = "user has not set their bio yet";
    }
    return (
      <div id='viewableBio' className='bio'>
        <span className='breakLongWords'>{ bio }</span>
      </div>

    )
  }

  render(){
    if (this.props.user === null || this.props.app.state.following === null) { //post failed to load, return null to not display this post
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
          {this.followUnfollowButton()}
          { this.displayViewableBio() }
        </div>
      </div>
    );
  }
}
