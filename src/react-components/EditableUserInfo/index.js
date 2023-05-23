import React from "react";
import "./styles.css";
import LoadingDisplay from "../../react-components/LoadingDisplay";

export default class UserInfo extends React.Component {
	constructor(props) {
		super(props)
		console.log("User: " , props.user);
		this.state = {
			profilePicture: props.user.profilePicture,
			bio: props.user.bio,
		};
	}
	

	displayViewableBio() {
		return (
			<div id="viewableBio" className="bio">
				<span className="breakLongWords">{this.state.bio}</span>
			</div>
		);
	}

	onChange(e) {
		this.setState({bio: e.target.value})	
	}

	displayEditableBio() {
		return (
			<div id="editableBioContainer">
				<textarea value={this.state.bio} onChange={this.onChange.bind(this)} id="editableBio" maxLength="100" className="bio" type="text">
					
				</textarea>
				<span id="bioCharLimitNotice">100 character limit</span>
			</div>
		);
	}

	saveEdits() {
		this.setState({editable: false})
		// e.preventDefault();
		var data = new FormData();
		if (this.state.image) {
			data.append("image", this.state.image);
		}
		data.append("bio", this.state.bio);
		console.log("bio: ", this.state.bio);
		console.log("sending update to api: ", data);
		fetch(`/api/users/updateprofile`, {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((json) => {
				let user = json.user;
				this.setState({
					image: null,
					profilePicture: user.profilePicture,
					bio: user.bio
				});
				console.log("updated user");
			});
	}
	

	toggleEditState() {
		if (this.state.editable) {
			this.saveEdits();
		} else {
			this.setState({editable: true});
		}
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

	changePhotoButton(){
		return (
			<>
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
			</>
		);
	}

	

	render() {
		
		if (this.props.user === null) { //post failed to load, return null to not display this post
			return <LoadingDisplay />;
		} 

		const {
			firstname,
			lastname,
			username,
		} = this.props.user;

		return (

				<div className="userInfoComponent" id="userInfoMain">
					<div>
						<img id="leftProfilePicture" src={
						this.state.image ? URL.createObjectURL(this.state.image) :
							this.state.profilePicture ? 
								this.state.profilePicture.image_url
								: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
						} alt="profile pic" />
						<h1>{firstname + " " + lastname}</h1>
						<h3>@{username}</h3>
					</div>

					<div>

						<div onClick={this.toggleEditState.bind(this)} id="bigProfileButton">
							{this.state.editable ? "Save Changes" : "Edit Profile"}
						</div>
						{this.state.editable
							? this.displayEditableBio()
							: this.displayViewableBio()}
						{this.state.editable ? this.changePhotoButton() : null}
					</div>
				</div>
			
		);
	}
}
