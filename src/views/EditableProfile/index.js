import React, { useState } from "react";

import "./styles.css";

import EditableUserInfo from "../../react-components/EditableUserInfo";
import ProfileUserConnections from "../../react-components/ProfileUserConnections";
import PostList from "../../react-components/PostList";
import ViewableUserInfo from "../../react-components/ViewableUserInfo";
import { useParams } from "react-router-dom";
import LoadingDisplay from "../../react-components/LoadingDisplay";

class EditableProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editable: props.app.state.user._id === props.userid,
			userid: props.userid,
			posts: [],
			user: null,
		}
	}

	componentDidMount() {
		this.setState({ userid: this.props.userid });
		const userid = this.props.userid
		console.log("UPDATED")
		fetch(`/api/users/${userid}`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ user: json }); //causes component to re-render with new state
			});
		

		fetch(`/api/users/${userid}/posts`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ posts: json }); //causes component to re-render with new state
			});
	}

	setBio(newBio) {
		this.setState({ bio: newBio });
	}

	userInfo() {
		if (this.state.user == null){
			return <LoadingDisplay/>
		}


		if (!this.state.editable) {
			return <ViewableUserInfo app={this.props.app} user={this.state.user}/>
		}

		
		return (<EditableUserInfo
			user={this.state.user}
			setBio={this.setBio.bind(this)}
		/>)
	}

	render() {
		return (
			<div id="profileContainer">
				<div id="userProfileInfoContainer">
					{this.userInfo()}
					{/* <div className="profileConnectionsWidth topRightMargin10px">
						<ProfileUserConnections app={this.props.app} editable={this.state.editable} />
					</div> */}
				</div>
				<div className="postListContainer">
					<PostList title="Posts" app={this.props.app} posts={this.state.posts} listComponent={this} />
				</div>
				
			</div>
		);
	}
}

// need to wrap in function to use hooks like useParams 
export default (props) => {

	const [userid, setuserid] = useState(useParams().id)
	return <EditableProfile {...props} userid={userid}/>
	
	
}
