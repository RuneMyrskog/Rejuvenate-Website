import React from "react";
import "./styles.css";
import { Link, refresh } from "react-router-dom";
import LoadingDisplay from "../../react-components/LoadingDisplay";
import { Nav, } from "react-bootstrap";

export default class SmallProfileBar extends React.Component {
	constructor(props){
		super(props);
		this.follow = props.app.follow.bind(props.app);
		this.unfollow = props.app.unfollow.bind(props.app);

		this.state = {
			userid: props.user._id
		}
	}

	emptyDiv() {
		return (<div></div>)
	}

	followUnfollowButton() {
		let followed = this.props.app.state.following.findIndex(user => user._id == this.props.user._id) != -1

		return followed ? (
			<div  className="followUnfollowButton" onClick={() => this.unfollow(this.props.user)}>
				Unfollow
			</div>
		) :
		(
			<div  className="followUnfollowButton" onClick={() => this.follow(this.props.user)}> 
				Follow
			</div>
		);
	}

	render() {
		
		const username=this.props.user.username
		const imgSrc= this.props.user.profilePicture ? this.props.user.profilePicture.image_url : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
		

		const linkTarget = {
			pathname: "/profile/" + this.props.user._id,
			props: { userid: this.props.user._id},
			key: 0,
		};



		return (
			<div className="smallProfileBar">
				<Nav.Link className="profileLink" href={"/profile/" + this.props.user._id}>
					<div className="smallProfileBarLinkPartial">
						<img className="smallProfileImg" src={imgSrc} alt="profile pic" />
						<div className="smallProfileInfo">
							<h5 className="smallProfileName">{this.props.user.firstname + " " + this.props.user.lastname}</h5>
							<h6 className="smallProfileUsername">@{username}</h6>
						</div>
					</div>
				</Nav.Link>
				{this.props.editable ? this.followUnfollowButton() : this.emptyDiv()}
			</div>
		);
	}
}


	
