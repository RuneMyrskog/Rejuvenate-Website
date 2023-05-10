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
			<div  className="followUnfollowContainer" >
				<span className="followUnfollowSpan" onClick={() => this.unfollow(this.props.user)}>unfollow</span>
			</div>
		) :
		(
			<div  className="followUnfollowContainer" > 
					<span className="followUnfollowSpan" onClick={() => this.follow(this.props.user)}>follow</span>
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
				<div className="smallProfileBarLinkPartial">
					<img className="smallProfileImg" src={imgSrc} alt="profile pic" />
					
						<div className="smallProfileInfo">
						<Nav.Link className="profileLink" href={"/profile/" + this.props.user._id}>
							<h5 className="smallProfileName">{this.props.user.firstname + " " + this.props.user.lastname}</h5>
							<h6 className="smallProfileUsername">@{username}</h6>
						</Nav.Link>
						</div>
					
					
				</div>
				{this.props.editable ? this.followUnfollowButton() : this.emptyDiv()}
			</div>
		);
	}
}


	
