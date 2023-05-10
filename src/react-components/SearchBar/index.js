import React from "react";
import "./styles.css";

import SmallProfileBar from "../../react-components/SmallProfileBar";
import LoadingDisplay from "../LoadingDisplay";

export default class SearchBar extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			matchedUsers: [],
		}
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
		if (this.props.app.state.following == null){
			return <LoadingDisplay/>
		}
		console.log("following", this.props.app.state.following)
		return (
			<div>
				{this.state.matchedUsers.map((user) => {
					return (
						<SmallProfileBar
							key={user._id}
							user={user}
							app={this.props.app}
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
