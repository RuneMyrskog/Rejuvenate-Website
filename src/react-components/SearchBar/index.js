import React from "react";
import "./styles.css";
import { getUsersAsList } from "../../userData.js";

import SmallProfileBar from "../../react-components/SmallProfileBar";

export default class SearchBar extends React.Component {
	state = {
		matchedUsers: [],
	};

	setMatchedUsers(query) {
		fetch(`/api/users/search?s=${query}&max=${this.props.maxusers}`)
			.then((res) => res.json())
			.then((users) => {
				console.log(`matched ${users.length} users for "${query}"`);
				console.log(users)
				this.setState({ matchedUsers: users });
			});
	
	}

	handleInput(e) {
		const query = e.target.value;
		this.setMatchedUsers(query);
		document.querySelector("#searchedProfilesContainer").style.display =
			"block";
	}

	isSearchBarChild(e) {
		let element = e;
		const searchBar = document.querySelector("#searchBar");

		while (element.parentNode != null) {
			if (element.parentNode === searchBar) {
				return true;
			}
			element = element.parentNode;
		}

		return false;
	}

	handleMouseUp(e) {
		const searchBar = document.querySelector("#searchBar");
		const searchedProfilesContainer = document.querySelector(
			"#searchedProfilesContainer"
		);
		if (!this.isSearchBarChild(e.target)) {
			searchedProfilesContainer.style.display = "none";
		}

		if (
			this.isSearchBarChild(e.target) &&
			searchedProfilesContainer.style.display === "none"
		) {
			searchedProfilesContainer.style.display = "block";
		}
	}

	componentDidMount() {
		document.addEventListener("mouseup", this.handleMouseUp.bind(this));
		this.setMatchedUsers("");
	}

	componentWillUnmount() {
		document.removeEventListener("mouseup", this.handleMouseUp.bind(this));
	}

	getMatchedUsers() {
		return (
			<div>
				{this.state.matchedUsers.map((user) => {
					return (
						<SmallProfileBar
							key={user._id}
							uid={user._id}
							isFollower={true}
							canUnfollow={true}
							canFollow={true}
							loginUserid={this.props.loginUserid}
							name={user.firstname + " " + user.lastname}
							username={user.username}
							imgSrc={
								user.profilePicture
									? user.profilePicture.image_url
									: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
							}
						/>
					);
				})}
			</div>
		);
	}
	// const users = getUsersAsList();
	// const matchedUsers = users.filter( user => user.username.toLowerCase().startsWith(this.state.query.toLowerCase()) || (user.firstName + " " + user.lastName).toLowerCase().startsWith(this.state.query.toLowerCase()));
	// const firstMatchedUsers = matchedUsers.slice(0, 5);

	render() {
		return (
			<div id="searchBar">
				<input
					autoComplete="off"
					onKeyUp={this.handleInput.bind(this)}
					type="text"
					name="searchBar"
					id="searchBar"
					placeholder="Search for a user..."
				/>
				<div id="searchedProfilesContainer" style={{ display: "none" }}>
					<div id="searchBarSeparator"></div>

					{this.getMatchedUsers()}
				</div>
			</div>
		);
	}
}
