import React from "react";
import "./styles.css";

import SmallProfileBar from "../SmallProfileBar";
import LoadingDisplay from "../LoadingDisplay";

export default class ProfileUserConnections extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showingFollowers: true,
		};
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
		if ((this.state.showingFollowers && this.props.app.state.followers  == null) ||
			(this.props.app.state.following == null)){
				return <LoadingDisplay/>
		}
		var userList = this.state.showingFollowers ? this.props.app.state.followers : this.props.app.state.following;
		
		return (
		<div>
			{userList.map((user) => {
				return (
					<SmallProfileBar
						user={user}
						key={user._id}
						app={this.props.app}
						editable={this.props.editable}
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
