const express = require('express');
const { ObjectID } = require('mongodb');
const { Image, Post } = require('../models');
const { mongoChecker, isMongoError } = require('./helpers/mongo_helpers');
const cloudinary = require('cloudinary');
const multipart = require('connect-multiparty');
const router = express.Router();
const log = console.log;

const CLOUDINARY_API_KEY = "193735732249155";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "HkfQZDE4wfICeSlDf1igVz5ta1M";


cloudinary.config({
    cloud_name: 'ooglyboogly343',
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

const multipartMiddleware = multipart();

/**
 * Create a new post.
 * 
 * Request body expects:
 * 
 * {
 * 		"userid": <userid>,
 * 		"title": <title>,
 * 		"text": <text>,
 * 		"image": <image>
 * }
 */
router.post(
	"/api/posts",
	multipartMiddleware,
	mongoChecker,
	async (req, res) => {
		const userid = req.body.userid;
		const tag = req.body.tag;
		const text = req.body.text;

		log("creating new post: ", req.body.text);
		if (req.session.user !== userid) {
			res.status(401).send("Unauthorized");
			return;
		}

		// Uploading an image to cloudinary, and creating an image modelm using result
		if (req.files && "image" in req.files) {
			try {
				cloudinary.uploader.upload(req.files.image.path, async (result) => {
					var image = {
						image_id: result.public_id,
						image_url: result.url,
						created_at: new Date(),
					};
					
					if (req.session.user !== userid) {
						res.status(401).send("Unauthorized");
						return;
					}

					const post = new Post({
						userid: userid, //id of user whos post this is
						tag: tag, //tag for this post
						text: text, //text for this post
						timestamp: new Date(), //current time
						image: image, //image for post or null
						comments: [], // list of comments (according to CommentSchema)
						likes: [], //list of user id's, number of likes is then likes.length
					});

					try {
						const result = await post.save();
						log(`Created post for user [${userid}]`);
						res.status(200).send(result);
					} catch (error) {
						log(error);
						if (isMongoError(error)) {
							res.status(500).send("Internal Server Error");
						} else {
							res.status(400).send();
						}
					}
				});
			} catch (error) {
				log(error);
				res.status(500).send("Problem uploading to cloudinary");
				return;
			}
		} else {
			const post = new Post({
				userid: userid, //id of user whos post this is
				tag: tag, //tag for this post
				text: text, //text for this post
				timestamp: new Date(), //current time
				image: null, //image for post or null
				comments: [], // list of comments (according to CommentSchema)
				likes: [], //list of user id's, number of likes is then likes.length
			});

			try {
				const result = await post.save();
				log(`Created post for user [${userid}]`);
				res.status(200).send(result);
			} catch (error) {
				log(error);
				if (isMongoError(error)) {
					res.status(500).send("Internal Server Error");
				} else {
					res.status(400).send();
				}
			}
		}
	}
);

/** Get post with id as given in url parameter. */
router.get("/api/post/:id", mongoChecker, async (req, res) => {
	const postid = req.params.id;

	if (!ObjectID.isValid(postid)) {
		res.status(404).send();
		return;
	}

	try {
		log(`fetching post [${postid}]`);
		const post = await Post.findById(postid);
		if (!post) {
			res.status(404).send();
			return;
		}
		res.status(200).send(post);
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send();
		}
	}
});

/**
 * Like or unlike a user post.
 * 
 * Request body expects:
 * 
 * {
 * 		"userid": <user id>
 * }
 */
router.post("/api/posts/:id/like", mongoChecker, async (req, res) => {
	const postid = req.params.id;
	const userid = req.body.userid;

	if (!ObjectID.isValid(postid)) {
		res.status(404).send("No such post");
		return;
	}
  
	if (!ObjectID.isValid(userid)) {
		res.status(404).send("No such user");
		return;
	}

	if (userid !== req.session.user) {
		res.status(401).send("Unauthorized");
	}

	try {
		const post = await Post.findById(postid);
		if (post.likes.includes(userid)) {
			// res.status(400).send("User has already liked this post");
			const userIndex = post.likes.indexOf(userid);
			if (userIndex === -1) {
				res.status(400).send("Unlike error");
				return;
			} else {
				post.likes.splice(userIndex, 1);
			}
		} else {
			post.likes.push(userid);
		}
		const result = await post.save();
		res.status(200).send(result);
		log(`user [${userid}] liked/unliked a post [${post._id}]`);
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send();
		}
	}
});


/**
 * Record that this user commented on this post.
 * 
 * Request body expects:
 * 
 * {
 *      "userid": <user id>
 *      "username": <username>
 *      "text": <comment text>
 * }
 */
router.post("/api/posts/:id/comment", mongoChecker, async (req, res) => {
	const postid = req.params.id;
	const { userid, username, text } = req.body;

	if (!ObjectID.isValid(postid)) {
		res.status(404).send("No such post");
		return;
	}

	if (!ObjectID.isValid(userid)) {
		res.status(404).send("No such user");
		return;
	}

	if (userid !== req.session.user) {
		res.status(401).send("Unauthorized");
	}


	try {
		const post = await Post.findById(postid);
		if (!post) {
			res.status(404).send("Could not find post");
			return;
		}
		post.comments.push({
			postid: post._id,
            userid: userid,
            username: username,
			text: text,
		});
        const result = await post.save();
        const commentResult = result.comments[result.comments.length - 1];
		res.status(200).send(commentResult);
		log(`user [${userid}] commented on a post [${post._id}]`);
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send();
		}
	}
});

/** Delete a post by its id. */
router.delete("/api/post/:id", mongoChecker, async (req, res) => {
	const postid = req.params.id;

	if (!ObjectID.isValid(postid)) {
		res.status(404).send();
		return;
	}

	try {
		log(`deleting post [${postid}]`);
		const post = await Post.findById(postid);
		if (!post) {
			res.status(404).send();
			return;
		}
    
		if (post.image == null) {
			// No image in post
			// Delete the post from the database
			const result = await Post.findByIdAndRemove(postid);
			if (!result) {
				res.status(404).send();
				return;
			}
			res.status(200).send(result);
		} else {
			// Have image in post
			// Delete an image by its id (NOT the database ID, but its id on the cloudinary server)
			// on the cloudinary server.
			cloudinary.uploader.destroy(post.image.image_id, async (saveRes) => {
				// Delete the post from the database
				const result = await Post.findByIdAndRemove(postid);
				if (!result) {
					res.status(404).send();
					return;
				}
				res.status(200).send(result);
			});
		}
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send();
		}
	}
});

module.exports = router;
