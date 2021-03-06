import React from "react";
import "./styles.css";
// import { IconButton } from "@material-ui/core";
// import AddCircleIcon from "@material-ui/icons/AddCircle";
// import FriendList from "../../react-components/FriendList";
import ProfileUserConnections from "../../react-components/ProfileUserConnections";
import PostList from "../../react-components/PostList";
import CreatePost from "../../react-components/CreatePost";
import { addPost } from "../../actions/post";
import { getLoggInUser, getUsers } from "../../userData";
import { Link } from "react-router-dom";

// Set up initial profile state.
const users = getUsers();
const user = users[getLoggInUser()];

const followersList = [];
for (let i = 0; i < user.numFollowers; i++) {
	const uid = user.followers[i];
	followersList.push({
		uid: uid,
		name: users[uid].firstName + " " + users[uid].lastName,
		username: users[uid].username,
		imgSrc: users[uid].profilePic,
	});
}

const followingList = [];
for (let i = 0; i < user.numFollowing; i++) {
	const uid = user.following[i];
	followingList.push({
		uid: uid,
		name: users[uid].firstName + " " + users[uid].lastName,
		username: users[uid].username,
		imgSrc: users[uid].profilePic,
	});
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		const loggedInUser = getLoggInUser();
		const allPosts = [];
		const users = getUsers();
		const followingUids = users[loggedInUser].following;

		// Show only the posts of the logged in user and the users they are following
		followingUids.push(loggedInUser);
		Object.keys(users).forEach((key) => {
			if (followingUids.includes(parseInt(key))) {
				users[key].posts.forEach((post) => {
					allPosts.push(post);
				});
			}
		});

		this.state = {
			posts: allPosts,
			followers: followersList,
			following: followingList,
			tag: "General",
			text: "",
			have_pic: 0,
			picture: "",
		};
	}

	// Generic handler for whenever we type in an input box.
	// We change the state for the particular property bound to the textbox from the event.
	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		// 'this' is bound to the Queue component in this arrow function.
		//  In arrow functinos, 'this' is bound to the enclosing lexical function/global scope
		//  where it is *defined*.  This is different than 'this' in normal functions,
		//  which are bound at the call-site.
		this.setState({
			[name]: value, // [name] sets the object property name to the value of the `name` variable.
		});
	};

	unfollow(followee) {
		this.state.following.splice(this.state.following.indexOf(followee), 1);
		this.setState((state, props) => ({
			numFollowing: state.numFollowing - 1,
		}));
	}

	render() {
		return (
			<div id="homeContainer">
				<Link to="/admin dashboard">
					<div id="adminDashboardButton">Go to admin dashboard</div>
				</Link>
				<div className="friendListContainer">
					<ProfileUserConnections
						canUnfollow={true}
						followers={this.state.followers}
						following={this.state.following}
						unfollow={this.unfollow.bind(this)}
					/>
				</div>
				<div className="postListContainer">
					<CreatePost
						posts={this.state.posts}
						tag={this.state.tag}
						text={this.state.text}
						have_pic={this.state.have_pic}
						picture={this.state.picture}
						handleInputChange={this.handleInputChange}
						addPost={() => addPost(this)}
					/>
					<PostList posts={this.state.posts} listComponent={this} />
				</div>
			</div>
		);
	}
}
