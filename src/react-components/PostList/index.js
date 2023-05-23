import React from "react";
import PostEntry from "../PostEntry";
import { ListGroup } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import "./styles.css";

export default class PostList extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount(){
		console.log("updated")
	}
	render() {
		return (
			<ListGroup className="postList">
				{/* <h2 className="postListTitle">{this.props.title}</h2> */}
				{this.props.posts.map((post) => (
					<PostEntry
						key={uuid()} /* unique id required to help React render more efficiently when we modify the students list. */
						post={post}
						listComponent={this.props.listComponent}
						app={this.props.app}
						removable={this.props.removable}
						removePost={this.props.removePost}
						removeComment={this.props.removeComment}
					/>
				))}
			</ListGroup>
		);
	}
}
