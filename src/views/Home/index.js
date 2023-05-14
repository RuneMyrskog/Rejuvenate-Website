import React from "react";
import "./styles.css";
import ProfileUserConnections from "../../react-components/ProfileUserConnections";
import PostList from "../../react-components/PostList";
import CreatePost from "../../react-components/CreatePost";
import { DumbellIcon } from "../../react-components/Icons";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {
			userid: null,
			posts: [],
			followers: [],
			following: [],
		};
	}

	componentDidMount() {
		const userid = this.props.app.state.user._id;
		this.setState({ userid: userid });
		

		fetch(`/api/users/${userid}/feed`)
			.then((res) => res.json())
			.then((json) => {
				this.setState({ posts: json }); //causes component to re-render with new state
			});
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

	appendPostToFeed(post){
		const posts = this.state.posts;
		posts.unshift(post); //append as first element
		this.setState({posts: posts});
	}

	render() {
		return (
			<div id="homeContainer">
				<div className="friendListContainer">
					<ProfileUserConnections
						app={this.props.app}
						editable={true}
					/>

					<DumbellIcon id="left-dumbell-icon" className="black-icon large-icon"/>
				</div>
				
					
				<div className="postListContainer">
					<CreatePost app={this.props.app} appendPostToFeed={this.appendPostToFeed.bind(this)} />
					<PostList
						title="Feed"
						posts={this.state.posts}
						listComponent={this}
						app={this.props.app}
					/>
				</div>
				
			</div>
		);
	}
}
