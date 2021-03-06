import React from "react";
import "./styles.css";

import EditableUserInfo from "../../react-components/EditableUserInfo";
import SpanLink from "../../react-components/SpanLink";
import ProfileUserConnections from "../../react-components/ProfileUserConnections";
import PostList from "../../react-components/PostList";

import { getUsers, getCurrentUser } from "../../userData.js";

// Set up initial profile state.
const users = getUsers();
const user = users[getCurrentUser()];

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

export default class EditableProfile extends React.Component {
	state = userState;

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

	render() {
		return (
			<div id="profileContainer">
				<EditableUserInfo
					user={this.state}
					setFavourites={this.setFavourites.bind(this)}
					setBio={this.setBio.bind(this)}
					updateFavouriteThings={this.updateFavouriteThings.bind(this)}
				/>

				<div id="middleProfilePageBar">
					{/* <div className='profilePageComp' id='userStatsPreview'>
            <h4>{ this.state.firstName }'s Pinned Stats</h4>
            <span id='viewMoreStatsText'>See more of { this.state.firstName }'s stats</span>
            </div> */}

					<div className="profilePageComp" id="userPosts">
						<PostList posts={this.state.posts} listComponent={this} />
					</div>
				</div>
				<div className="profileConnectionsWidth topRightMargin10px">
					<ProfileUserConnections
						canUnfollow={true}
						numFollowers={this.state.numFollowers}
						numFollowing={this.state.numFollowing}
						followers={this.state.followers}
						following={this.state.following}
						unfollow={this.unfollow.bind(this)}
					/>
				</div>
			</div>
		);
	}
}
