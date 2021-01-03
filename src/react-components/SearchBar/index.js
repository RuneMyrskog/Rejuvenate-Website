import React from "react";
import "./styles.css";
import { getUsersAsList } from "../../userData.js";

import SmallProfileBar from "../../react-components/SmallProfileBar";

export default class SearchBar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			matchedUsers: [],
			following: props.app.state.user.following
		}
	}
	follow(user) {
		fetch(`/api/users/follow/${user._id}`, {
			method: "post",
		})
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject();
		})
		.then(json => {
			// this.props.app.setState({user: json.user})
			const following = this.state.following;
			following.push(json.follow);
			this.setState({following: following})
		})
	}

	unfollow(user) {
		fetch(`/api/users/unfollow/${user._id}`, {
			method: "post",
		})
		.then(res => {
			if (res.status === 200) {
				return res.json();
			}
			return Promise.reject();
		})
		.then(json => {
			// this.props.app.setState({user: json.user})
			const following = this.state.following;
			following.splice(following.indexOf(json.follow._id), 1)
			this.setState({following: following})
		})
	}

	setMatchedUsers(query) {
		fetch(`/api/users/search?s=${query}&max=${this.props.maxusers}`)
			.then((res) => res.json())
			.then((users) => {
				console.log(`matched ${users.length} users for "${query}"`);
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
							user={user}
							followed={this.state.following.indexOf(user._id) != -1}
							follow={this.follow.bind(this)} unfollow={this.unfollow.bind(this)}
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
