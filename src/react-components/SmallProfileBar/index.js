import React from "react";
import "./styles.css";
import { Link, refresh } from "react-router-dom";
import LoadingDisplay from "../../react-components/LoadingDisplay";

export default class SmallProfileBar extends React.Component {

	followUnfollowButton() {
		return this.props.followed ? (
			<div  className="followUnfollowButton" onClick={() => this.props.unfollow(this.props.user)}>
				Unfollow
			</div>
		) :
		(
			<div  className="followUnfollowButton" onClick={() => this.props.follow(this.props.user)}> 
				Follow
			</div>
		);
	}

	render() {
		
		const username=this.props.user.username
		const imgSrc= this.props.user.profilePicture ? this.props.user.profilePicture.image_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
		

		const linkTarget = {
			pathname: this.props.uid ? "/otherUserProfile" : "/userProfile",
			props: { uid: this.props.uid },
			key: 0,
		};

		return (
			<div className="smallProfileBar">
				<Link to={linkTarget} >
					<div className="smallProfileBarLinkPartial">
						<img className="smallProfileImg" src={imgSrc} alt="profile pic" />
						<div className="smallProfileInfo">
							<h5 className="smallProfileName">{this.props.user.firstname + " " + this.props.user.lastname}</h5>
							<h6 className="smallProfileUsername">@{username}</h6>
						</div>
					</div>
				</Link>
				{this.followUnfollowButton()}
			</div>
		);
	}
}


	
