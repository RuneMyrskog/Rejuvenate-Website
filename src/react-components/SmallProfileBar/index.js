import React from "react";
import "./styles.css";
import { Link, refresh } from "react-router-dom";
import LoadingDisplay from "../../react-components/LoadingDisplay";

export default class SmallProfileBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			followed: null,
		};
	}

	followUser(userid) {
		fetch(`/api/users/follow/${userid}`, {
			method: "post",
		});
	}

	unfollowUser(userid) {
		fetch(`/api/users/unfollow/${userid}`, {
			method: "post",
		});
	}

	componentDidMount(){
		fetch(`/api/users/${this.props.uid}`)
			.then((res) => res.json())
			.then((json) => {
				const followedstate = json.followers.includes(this.props.loginUserid);
				this.setState({ followed: followedstate });
			});
	}

	getBothBar() {
		const { name, username, imgSrc } = this.props;

		const linkTarget = {
			pathname: this.props.uid ? "/otherUserProfile" : "/userProfile",
			state: { uid: this.props.uid },
			key: 0,
		};

		if (this.state.followed == null) {
			return <LoadingDisplay />;
		} else {
			return (
				<div id="smallProfileBar">
					<Link
						onClick={() => {
							this.forceUpdate();
						}}
						to={linkTarget}
					>
						<div id="smallProfileBarLinkPartial">
							<img id="smallProfileImg" src={imgSrc} alt="profile pic" />
							<div id="smallProfileInfo">
								<h5 id="smallProfileName">{name}</h5>
								<h6 id="smallProfileUsername">@{username}</h6>
							</div>
						</div>
					</Link>
					<div id="buttonContainer">
						{this.state.followed ? (
							<div
								onClick={() => this.unfollowUser(this.props.uid)}
								id="unfollowButtonSmall"
							>
								Unfollow
							</div>
						) : (
							<div
								onClick={() => this.followUser(this.props.uid)}
								id="unfollowButtonSmall"
							>
								follow
							</div>
						)}
					</div>
				</div>
			);
		}
	}

	getNormalBar() {
		const { name, username, imgSrc } = this.props;

		const linkTarget = {
			pathname: this.props.uid ? "/otherUserProfile" : "/userProfile",
			state: { uid: this.props.uid },
			key: 0,
		};

		return (
			<div id="smallProfileBar">
				<Link
					onClick={() => {
						this.forceUpdate();
					}}
					to={linkTarget}
				>
					<div id="smallProfileBarLinkPartial">
						<img id="smallProfileImg" src={imgSrc} alt="profile pic" />
						<div id="smallProfileInfo">
							<h5 id="smallProfileName">{name}</h5>
							<h6 id="smallProfileUsername">@{username}</h6>
						</div>
					</div>
				</Link>
			</div>
		);
	}

	getRemoveUserButton() {
		return (
			<div
				className="removeUserButton"
				onClick={() => this.props.removeUser(this.props.uid)}
			></div>
		);
	}

	getRemovableBar() {
		const { name, username, imgSrc } = this.props;

		const linkTarget = {
			pathname: this.props.uid ? "/otherUserProfile" : "/userProfile",
			state: { uid: this.props.uid },
			key: 0,
		};

		return (
			<div id="smallProfileBar">
				<Link
					onClick={() => {
						this.forceUpdate();
					}}
					to={linkTarget}
				>
					<div id="smallProfileBarLinkPartial">
						<img id="smallProfileImg" src={imgSrc} alt="profile pic" />
						<div id="smallProfileInfo">
							<h5 id="smallProfileName">{name}</h5>
							<h6 id="smallProfileUsername">@{username}</h6>
						</div>
					</div>
				</Link>
				<div
					onClick={() => this.props.removeUser(this.props.uid)}
					id="unfollowButtonSmall"
				>
					Remove
				</div>
			</div>
		);
	}

	getUnfollowableBar() {
		const { name, username, imgSrc } = this.props;

		const linkTarget = {
			pathname: this.props.uid ? "/otherUserProfile" : "/userProfile",
			state: { uid: this.props.uid },
			key: 0,
		};

		return (
			<div id="smallProfileBar">
				<Link
					onClick={() => {
						this.forceUpdate();
					}}
					to={linkTarget}
				>
					<div id="smallProfileBarLinkPartial">
						<img id="smallProfileImg" src={imgSrc} alt="profile pic" />
						<div id="smallProfileInfo">
							<h5 id="smallProfileName">{name}</h5>
							<h6 id="smallProfileUsername">@{username}</h6>
						</div>
					</div>
				</Link>
				<div
					onClick={() => this.unfollowUser(this.props.user)}
					id="unfollowButtonSmall"
				>
					Unfollow
				</div>
			</div>
		);
	}

	render() {
		const { name, username, imgSrc } = this.props;

		const linkTarget = {
			pathname: this.props.uid ? "/otherUserProfile" : "/userProfile",
			state: { uid: this.props.uid },
			key: 0,
		};

		return (
			<div>
				{this.props.canUnfollow
					? this.props.canFollow
						? this.getBothBar()
						: this.getUnfollowableBar()
					: this.props.removeUser
					? this.getRemovableBar()
					: this.getNormalBar()}
			</div>
		);
	}
}
