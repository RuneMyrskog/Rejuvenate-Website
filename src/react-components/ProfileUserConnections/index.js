import React from "react";
import "./styles.css";

import SmallProfileBar from "../SmallProfileBar";
import LoadingDisplay from "../LoadingDisplay";

export default class ProfileUserConnections extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showingFollowers: true,
			followers: [],
			following: []
		};
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
			console.log("before", following)
			let index = following.findIndex(user => user._id == json.follow._id)
			following.splice(index, 1);
			console.log("splicing index", index)
			console.log("after", following)
			this.setState({following: following})
			this.forceUpdate();
		})
	}
	componentDidMount(){
		const user = this.props.app.state.user;
		fetch(`/api/users/${user._id}/followers`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ followers: json}); //causes component to re-render with new state
				console.log("followers", json)
			});

	
		fetch(`/api/users/${user._id}/following`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ following: json}); //causes component to re-render with new state
				console.log("following", json)
			});
	}

	renderNavBar() {
			return (
				<div id="userConnectionsNav">
					<ul>
						<li className={this.state.showingFollowers ? "selectedNav" : "unselectedNav"} onClick={() => this.setState({ showingFollowers: true })}>
							<span>
									Followers
							</span>
						</li>
						<li className={this.state.showingFollowers ? "unselectedNav" : "selectedNav"} onClick={() => this.setState({ showingFollowers: false })}>
							<span>
									Following
							</span>
						</li>
					</ul>
				</div>
			);
	}

	renderUserConnections() {
		if ((this.state.showingFollowers && this.state.followers == null) ||
			(!this.state.showingFollowers && this.state.following == null)){
				return <LoadingDisplay/>
		}

		var userList = this.state.showingFollowers ? this.state.followers : this.state.following;
		console.log("userList", userList)
		return (
		<div>
			{userList.map((user, index) => {
				return (
					<SmallProfileBar
						uid={user._id}
						user={user}
						unfollow={this.unfollow.bind(this)} follow={this.follow.bind(this)}
						key={index}
						followed={this.state.following.indexOf(user) != -1}
						app={this.props.app}
					/>
					)}
			)}
		</div>
		)
	}

	render() {
		return (
			<div id="userConnections">
				{this.renderNavBar()}
				<div id="userConnectionsList">{this.renderUserConnections()}</div>
			</div>
		);
	}
}
