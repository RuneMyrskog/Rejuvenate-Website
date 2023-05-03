import React from "react";
import "./styles.css";
import {
	getfavoriteThings,
	getfavoriteThingsToImages,
} from "../../userData.js";
import LoadingDisplay from "../../react-components/LoadingDisplay";

import FavoriteThing from "../FavoriteThing";

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

	removefavorite(favorite) {
		const favorites = this.props.user.favoriteThings;
		favorites.splice(favorites.indexOf(favorite), 1);
		this.props.setfavorites(favorites);
	}

	addfavorite(favorite) {
		const favorites = this.props.user.favoriteThings;
		favorites.push(favorite);
		this.props.setfavorites(favorites);
		this.enableRemovingfavorites();
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

	enableRemovingfavorites(favourties) {
		this.setState((state, props) => ({
			editable: true,
			canAddfavorites: false,
			canRemovefavorites: true,
		}));
	}

	enableAddingfavorites(favourties) {
		this.setState((state, props) => ({
			editable: true,
			canAddfavorites: true,
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

	displayRemovablefavorites() {
		return (
			<div>
				<div
					onClick={this.enableAddingfavorites.bind(this)}
					id="addfavoriteThingsButton"
				>
					<span id="plusSymbol">+</span>
				</div>
				{this.props.user.favoriteThings.map((f, index) => {
					return (
						<FavoriteThing
							key={index}
							onEditableButtonClick={this.removefavorite.bind(this)}
							addable={false}
							removable={true}
							index={index}
							name={f}
							imgSrc={getfavoriteThingsToImages()[f]}
						/>
					);
				})}
			</div>
		);
	}

	displayAddablefavorites() {
		const unusedFavs = getfavoriteThings().filter(
			(f) => !this.props.user.favoriteThings.includes(f)
		);
		return (
			<div>
				{unusedFavs.map((f, index) => {
					return (
						<FavoriteThing
							key={index}
							onEditableButtonClick={this.addfavorite.bind(this)}
							setfavorites={this.props.setfavorites}
							addable={true}
							removable={false}
							index={index}
							name={f}
							imgSrc={getfavoriteThingsToImages()[f]}
						/>
					);
				})}
			</div>
		);
	}

	displayUneditablefavorites() {
		return (
			<div>
				{this.props.user.favoriteThings.map((f, index) => {
					return (
						<FavoriteThing
							key={index}
							setfavorites={this.props.setfavorites}
							addable={false}
							removable={false}
							index={index}
							name={f}
							imgSrc={getfavoriteThingsToImages()[f]}
						/>
					);
				})}
			</div>
		);
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
			bio,
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
				{/* <div className="userInfoComponent" id="favoriteThings">
					<h4>{firstname + "'s favorites"}</h4>
					<div id="favoriteThingsContainer">
						{!this.state.editable ? this.displayUneditablefavorites() : ""}
						{this.state.canAddfavorites ? this.displayAddablefavorites() : ""}
						{this.state.canRemovefavorites
							? this.displayRemovablefavorites()
							: ""}
					</div>
				</div> */}
			</div>
		);
	}
}
