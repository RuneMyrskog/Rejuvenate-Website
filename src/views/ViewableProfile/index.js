import React from "react";
import "./styles.css";

import ViewableUserInfo from "../../react-components/ViewableUserInfo";
import SpanLink from "../../react-components/SpanLink";
import ProfileUserConnections from "../../react-components/ProfileUserConnections";
import PostList from "../../react-components/PostList";

import { getUsers, getCurrentUser } from "../../userData.js";

export default class ViewableProfile extends React.Component {
	constructor(props) {
		super(props);
		this.setStateInsideConstructor();
	}

	componentWillReceiveProps(newProps) {
		this.setStateOutsideConstructor(newProps);
	}

	getStateObject(uid) {
		// Set up initial profile state.
		const users = getUsers();
		const user = users[uid];

		const followersList = [];
		for (let i = 0; i < user.numFollowers; i++) {
			const uid = user.followers[i];
			followersList.push({
				uid: uid,
				name: users[uid].firstName + " " + users[uid].lastName,
				username: users[uid].username,
				imgSrc: users[uid].profilePic,
			});
		}

		const followingList = [];
		for (let i = 0; i < user.numFollowing; i++) {
			const uid = user.following[i];
			console.log(uid);
			followingList.push({
				uid: uid,
				name: users[uid].firstName + " " + users[uid].lastName,
				username: users[uid].username,
				imgSrc: users[uid].profilePic,
			});
		}

		// Create a deep copy of user.
		const userState = JSON.parse(JSON.stringify(user));
		userState.followers = followersList;
		userState.following = followingList;

		return userState;
	}

	setStateInsideConstructor() {
		this.state = this.getStateObject(this.props.location.state.uid);
	}

	setStateOutsideConstructor(newProps) {
		this.setState(this.getStateObject(newProps.location.state.uid));
	}

	unfollow(followee) {
		this.state.following.splice(this.state.following.indexOf(followee), 1);
		this.setState((state, props) => ({
			numFollowing: state.numFollowing - 1,
		}));
	}

	setFavourites(a) {
		this.setState({ favouriteThings: a });
	}

	setBio(newBio) {
		this.setState({ bio: newBio });
	}

	updateFavouriteThings(newFavouriteThings) {
		this.setState({ favouriteThings: newFavouriteThings });
	}

	getIndexOfLoggedInUserInFollowersList() {
		let indexOfLoggedInUser = -1;
		for (let i = 0; i < this.state.followers.length; i++) {
			if (this.state.followers[i].uid == 0) {
				indexOfLoggedInUser = i;
			}
		}
		return indexOfLoggedInUser;
	}

	toggleFollow() {
		const indexOfLoggedInUser = this.getIndexOfLoggedInUserInFollowersList();

		const newFollowers = this.state.followers;
		if (indexOfLoggedInUser != -1) {
			newFollowers.splice(indexOfLoggedInUser, 1);
		} else {
			const loggedInUser = getUsers()[0];
			newFollowers.push({
				uid: 0,
				name: loggedInUser.firstName + " " + loggedInUser.lastName,
				username: loggedInUser.username,
				imgSrc: loggedInUser.profilePic,
			});
		}

		let delta = 1;
		if (indexOfLoggedInUser != -1) {
			delta = -1;
		}

		this.setState({
			followers: newFollowers,
			numFollowers: this.state.numFollowers + delta,
		});
	}

	render() {
		return (
			<div id="profileContainer">
				<ViewableUserInfo
					canFollow={
						this.getIndexOfLoggedInUserInFollowersList() === -1 ? true : false
					}
					toggleFollow={this.toggleFollow.bind(this)}
					user={this.state}
				/>

				<div id="middleProfilePageBar">
					{/* <div className="profilePageComp" id="userStatsPreview">
						<h4>{this.state.firstName}'s Pinned Stats</h4>
						<span id="viewMoreStatsText">
							See more of {this.state.firstName}'s stats
						</span>
					</div> */}

					<div className="profilePageComp" id="userPosts">
						<PostList posts={this.state.posts} listComponent={this} />
					</div>
				</div>
				<div className="profileConnectionsWidth topRightMargin10px">
					<ProfileUserConnections
						app={this.props.app}
					/>
				</div>
			</div>
		);
	}
}
