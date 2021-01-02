import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import { IconButton } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CancelIcon from "@material-ui/icons/Cancel";
import { addLike, removeLike, addComment } from "../../actions/post";
import LoadingDisplay from "../../react-components/LoadingDisplay";

import "./styles.css";



class CommentSection extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			display: 'none',
			comments: props.comments,
		}
	}

	toggleDisplay(e) {
		let toggledDisplay = this.state.display === 'none' ? 'block' : 'none';
			this.setState({display: toggledDisplay});
	}

	showCommentsButton() {
		let spanText = this.state.display === 'none' ? 'show comments' : 'hide comments';
		return(
			<span className="showCommentsSpan" onClick={this.toggleDisplay.bind(this)}>{spanText}</span>
		)
	}

	render() {
		return (
			<div className="comments">
				{this.showCommentsButton()}
				<ListGroup style={{display: this.state.display}}className="commentSection">
					{
						this.state.comments.map(comment => {
							return (<CommentRow key={uuid()} comment={comment}/>);
						})
					}
				</ListGroup>
				<Form.Control
					className="commentInput"
					type="text"
					placeholder="Write Your Comment!"
					onKeyPress={this.props.onKeyUp}
				/>
			</div>
		);

	}
}

class CommentRow extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			commentsVisible: false
		}
	}
	render(){

		const comment = this.props.comment;
		return (
			<ListGroup.Item className="commentListItem" key={uuid()}>
				{this.props.removable ? (
					//TODO: maybe modify this
					<IconButton
						id="commentRemoveButton"
						onClick={() => this.props.removeComment(comment._id)}
					>
						<CancelIcon id="commentCancelIcon" />
					</IconButton>
				) : (
					""
				)}
				<div className="commentuser">{this.props.comment.username}</div>
				<div className="comment">{this.props.comment.text}</div>
			</ListGroup.Item>
		);
	}
}


export default class PostEntry extends React.Component {
	constructor(props) {
		super(props);
		const {
			userid,
			tag,
			text,
			timestamp,
			image,
			comments,
			likes,
		} = this.props.post;

		this.state = {
			liked: likes.includes(userid),
			num_likes: likes.length,
			postUser: null,
			commentRows: null,
			comments: comments,
			loading: true
		};
	}

	componentDidMount() {
		const {
			userid,
			tag,
			text,
			timestamp,
			image,
			comments,
			likes,
		} = this.props.post;

		fetch(`/api/users/${userid}`)
			.then((res) => {
				if (res.status !== 200){
					return Promise.reject(); 
				} 
				return res.json()
			})
			.then((json) => {
				this.setState({ postUser: json });
			})
			.finally(() => {
				this.setState({loading: false});
			})
	}

	handleLike() {
		fetch(`/api/posts/${this.props.post._id}/like`, {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userid: this.props.app.state.user._id }),
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
			});

		// Update frontend so that it matches the new status after refresh
		if (this.state.liked) {
			this.setState({
				liked: false,
				num_likes: this.state.num_likes - 1,
			});
		} else {
			this.setState({
				liked: true,
				num_likes: this.state.num_likes + 1,
			});
		}
	}

	onKeyUp(event) {
		if (event.key === "Enter") {
			const user = this.props.app.state.user;
			const commentText = event.target.value;
			console.log(user);

			fetch(`/api/posts/${this.props.post._id}/comment`, {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				
				body: JSON.stringify({
					userid: user._id,
					username: user.username,
					text: commentText,
				}),
			})
				.then((res) => res.json())
				.then((comment) => {
					console.log(comment);
					event.target.value = "";
					const comments = this.state.comments;
					console.log(comment.username);
					console.log(comment.text);
					comments.push(comment)
					this.setState({comments: comments});
				});
		}
	}

	displayRemoveButton() {
		return (
			//TODO: maybe modify this
			<IconButton
				id="postRemoveButton"
				onClick={() => this.props.removePost(this.props.post._id)}
			>
				<CancelIcon id="cancelIcon" />
			</IconButton>
		);
	}

	render() {
		const {
			userid,
			tag,
			text,
			timestamp,
			image,
			comments,
			likes,
		} = this.props.post;

		const imageContainer = [];

		if (image) {
			imageContainer.push(
				<img className="img" src={image.image_url} key={uuid()} />
			);
		}

		if(this.state.loading) { //show that this post is still loading
			return <LoadingDisplay/>;
		}
		if (this.state.postUser === null) { //post failed to load, return null to not display this post
			return null; 
		} else { //post loaded, display it
			return (
				<div className="postEntryContainer">
					{this.props.removable ? this.displayRemoveButton() : ""}
					<div className="tag">{tag}</div>
					<div className="user">
						<img
							className="avatar"
							src={
								this.state.postUser.profilePicture
									? this.state.postUser.profilePicture.image_url
									: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
							}
							alt=""
						/>
						<div className="username">{this.state.postUser.username}</div>
					</div>
					<div className="text">{text}</div>
					<div className="imageContainer">{imageContainer}</div>

					<div className="likes">
						<IconButton
							className="likeButton"
							onClick={() => this.handleLike()}
						>
							{this.state.liked ? (
								<FavoriteIcon className="filledLikeIcon" />
							) : (
								<FavoriteBorderIcon className="likeIcon" />
							)}
						</IconButton>
						<div className="likeNum">{this.state.num_likes}</div>
					</div>
					<CommentSection comments={this.state.comments} onKeyUp={this.onKeyUp.bind(this)}/>
				</div>
			);
		}
	}
}
