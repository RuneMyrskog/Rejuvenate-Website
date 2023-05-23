import { TransferWithinAStation } from "@material-ui/icons";
import React from "react";
import { Form, Button } from "react-bootstrap";
// import { addPost } from "../../actions/post";

import "./styles.css";

export default class CreatePost extends React.Component {
  	constructor(props) {
		super(props);
		this.state = {
			image: null,
			text: "",
			tag: "General",
		};
	}

	handleImageUpload(e) {
		var fileUpload = e.target;
		console.log("yes");
		console.log(e.target);
		if ("files" in fileUpload) {
			console.log("iwuhfsd");
			if (fileUpload.files.length > 0) {
				var image = fileUpload.files[0];
				this.setState({ image: image });
			}
		}
	}

	displayUploadedImage() {
		if (this.state.image) {
			return (
				<div id="imageURLContainer">
					<img
						id="uploadedImage"
						src={URL.createObjectURL(this.state.image)}
						alt="yourUploadedImg"
					></img>
					<button
						id="removeImageButton"
						onClick={() => this.setState({ image: null })}>
						Remove Image
					</button>
				</div>
			);
		}
	}

	createPost(e) {
		e.preventDefault();
		var data = new FormData();
		if (this.state.image) {
			data.append("image", this.state.image);
		}
		data.append("tag", this.state.tag);
		data.append("text", this.state.text);
		data.append("userid", this.props.app.state.user._id);

		console.log("dataasfas: ", data);
		fetch(`/api/posts`, {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((newPost) => {
				this.setState({
					image: null,
					text: "",
					tag: "General",
				});
				this.props.appendPostToFeed(newPost);
				console.log("created post!");
			});
	}

	render() {
		return (
			<div className="createPostContainer">
				<div className="createPostComponent">
					<Form className="createPost">
						<Form.Group controlId="Tag">
							<Form.Label className="tagLabel">Tag</Form.Label>
							<Form.Control
								as="select"
								className="tagSelect"
								name="tag"
								value={this.state.tag}
								onChange={(e) => this.setState({ tag: e.target.value })}
							>
								<option className="tagSelect">General</option>
								<option className="tagSelect">Fitness</option>
								<option className="tagSelect">Recipe</option>
								<option className="tagSelect">Sleep</option>
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="Body">
							<Form.Label className="contentLabel">Post Content</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								className="contentInput"
								name="text"
								value={this.state.text}
								onChange={(e) => this.setState({ text: e.target.value })}
							/>
							<input
								type="file"
								accept="/image/*"
								name="picture"
								id="file"
								className="inputPicture"
								onChange={this.handleImageUpload.bind(this)}
							/>
							<label htmlFor="file" id="uploadImageButton">
								Upload Image
							</label>

							{this.displayUploadedImage()}
						</Form.Group>
						<Button
							variant="primary"
							type="submit"
							className="postButton"
							onClick={this.createPost.bind(this)}
						>
							Post
						</Button>
					</Form>
				</div>
			</div>
		);
	}
}
