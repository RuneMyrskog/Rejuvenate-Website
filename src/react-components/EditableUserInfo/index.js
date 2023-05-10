import React from "react";
import "./styles.css";
import LoadingDisplay from "../../react-components/LoadingDisplay";

export default class UserInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			canRemovefavorites: false,
			canAddfavorites: false,
		};
	}
	

	displayViewableBio() {
		return (
			<div id="viewableBio" className="bio">
				<span className="breakLongWords">{this.props.user.bio}</span>
			</div>
		);
	}

	displayEditableBio() {
		return (
			<div id="editableBioContainer">
				<textarea id="editableBio" maxLength="100" className="bio" type="text">
					{this.props.user.bio}
				</textarea>
				<span id="bioCharLimitNotice">100 character limit</span>
			</div>
		);
	}

	saveEdits() {
		//this.props.setBio(document.querySelector("#editableBio").value);
		let newBio = document.querySelector("#editableBio").value
		this.props.user.bio = newBio
		this.setState((state, props) => ({
			editable: false,
			canAddfavorites: false,
			canRemovefavorites: false,
		}));
	}
	

	toggleEditState() {
		if (this.state.editable) {
			this.saveEdits();
		} else {
			this.enableRemovingfavorites();
		}
	}

	

	render() {
		
		if (this.props.user === null) { //post failed to load, return null to not display this post
			return <LoadingDisplay />;
		} 

		const {
			firstname,
			lastname,
			username,
			profilePicture,
		} = this.props.user;

		return (
			<div id="userInfo">
				{/* Need to pull image, name, username, list of followers, list of users following, bio */}
				<div className="userInfoComponent" id="userInfoMain">
					<img id="leftProfilePicture" src={
						profilePicture ? 
							profilePicture.image_url
							: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
					} alt="profile pic" />
					<h1>{firstname + " " + lastname}</h1>
					<h3>@{username}</h3>
					{/*<ul>
            <li><b>Followers</b><br /><span className='follow-amount'>{ numFollowers }</span></li>
            <li><b>Following</b><br /><span className='follow-amount'>{ numFollowing }</span></li>
          </ul>*/}
					<div onClick={this.toggleEditState.bind(this)} id="bigProfileButton">
						{this.state.editable ? "Save Changes" : "Edit Profile"}
					</div>
					{this.state.editable
						? this.displayEditableBio()
						: this.displayViewableBio()}
				</div>
			</div>
		);
	}
}
