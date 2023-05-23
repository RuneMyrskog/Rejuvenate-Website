const express = require("express");
const { ObjectID } = require("mongodb");
const { User, Statistic, Post } = require("../models");
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
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
 * Get the current user calling this route.
 */
router.get("/api/users/currentuser", mongoChecker, async (req, res) => {
	if (!req.session.user) {
		res.redirect("/login");
	}

	if (!ObjectID.isValid(req.session.user)) {
		res.status(404).send();
		return;
	}

	try {
		const user = await User.findById(req.session.user);
		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		res.status(200).send(user);
	} catch (error) {
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			log(error);
			res.status(400).send("Internal Server Error");
		}
	}
});

/**
 * Check if this username already exists in the user database.
 *
 * Expected response body:
 *
 * {
 *      isTaken: <true if taken, else false>
 * }
 */
router.get("/api/users/check/:username", async (req, res) => {
	const username = req.params.username;

	try {
		log(`checking username ${username}`);
		const existingUser = await User.findOne({ username: username });
		let usernameTaken;

		if (existingUser) {
			log(`username ${username} is taken`);
			usernameTaken = true;
		} else {
			log(`username ${username} is not yet taken`);
			usernameTaken = false;
		}

		res.status(200).send({ usernameTaken: usernameTaken });
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send("Bad Request");
		}
	}
});

/**
 * Get users matching search, query parameters are:
 *
 * s: string of username to search,
 * max: max number of users to return
 */
router.get("/api/users/search", mongoChecker, async (req, res) => {
	if (!req.query) {
		res.status(400).send("Bad request");
		return;
	}

	const searchstring = req.query.s || "";
	const maxusers = parseInt(req.query.max) || 5;

	try {
		const users = await User.find({ 
			$and: [
				{username: new RegExp(`^${searchstring}.*`, "i")},
				{_id: { $ne: req.session.user}},
			]
		}).limit(maxusers); // find by regular expression match
		log(`search for username "${searchstring}" found ${users.length} matches`);
		res.status(200).send(users);
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
 * Get a particular user by id.
 */
router.get("/api/users/:id", mongoChecker, async (req, res) => {
	const userid = req.params.id;
	log(`fetching user ${userid}`);

	try {
		const user = await User.findById(userid);
		if (!user) {
			res.status(404).send();
			return;
		}
		res.status(200).send(user);
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send("Bad Request");
		}
	}
});

/**
 * get all users in database
 */
router.get("/api/users", mongoChecker, async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (error) {
		if (isMongoError(error)) {
			res.status(500).redirect("/login");
		} else {
			log(error);
			res.status(400).redirect("/login");
		}
	}
});

// Create new user and add to database

/**
 * Create a new user in the user database.
 *
 * Request body expects:
 *
 * {
 *      "username": <username>,
 *      "password": <password>,
 *      "firstname": <firstname>,
 *      "lastname": <lastname>
 * }
 */
router.post("/api/users", mongoChecker, async (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		profilePicture: null,
		bio: null,
		followers: [],
		following: [],
		isAdmin: false,
	});

	log(`Creating new user ${user.username}`);

	try {
		const result = await user.save();
		res.send(result);
	} catch (error) {
		if (isMongoError(error)) {
			res.status(500).redirect("/login");
		} else {
			log(error);
			res.status(400).redirect("/login");
		}
	}
});

/**
 * Get all users this user is following.
 */
router.get("/api/users/:id/following", mongoChecker, async (req, res) => {
	const userid = req.params.id;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	try {
		const user = await User.findById(userid);
		if (!user) {
			res.status(404).send();
			return;
		}

		const following = await User.find({ _id: { $in: user.following } });

		if (!following) {
			res.status(404).send();
			return;
		}
		res.status(200).send(following);
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
 * Get all users following this user
 */
router.get("/api/users/:id/followers", mongoChecker, async (req, res) => {
	const userid = req.params.id;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	try {
		const user = await User.findById(userid);
		if (!user) {
			res.status(404).send();
			return;
		}

		const followers = await User.find({ _id: { $in: user.followers } });

		if (!followers) {
			res.status(404).send();
			return;
		}
		res.status(200).send(followers);
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
 * Get top 10 most recent posts of this user and the users they follow.
 * This generates the user feed.
 */
router.get("/api/users/:id/feed", mongoChecker, async (req, res) => {
	const userid = req.params.id;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	log(`fetching feed for ${userid}`);

	try {
		const user = await User.findById(userid);
		if (!user) {
			res.status(404).send();
			return;
		}

		const feed = await Post.find({
			$or: [{ userid: { $in: user.following } }, { userid: user._id }],
		})
			.sort({ timestamp: -1 })
			.limit(10); // returns top 10 most recent posts from followers or self

		if (!feed) {
			res.status(404).send();
			return;
		}
		res.status(200).send(feed);
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
 * Get all posts for this user.
 */
router.get("/api/users/:id/posts", mongoChecker,  async (req, res) => {
	const userid = req.params.id;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	log(`fetching all posts for user [${userid}]`);

	try {
		const posts = await Post.find({ userid: userid });
		if (!posts) {
			res.status(404).send();
			return;
		}
		res.status(200).send(posts);
	} catch (error) {
		log(error);
		if (isMongoError(error)) {
			res.status(500).send("Internal Server Error");
		} else {
			res.status(400).send();
		}
	}

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	log(`fetching feed for ${userid}`);

	try {
		const user = await User.findById(userid);
		if (!user) {
			res.status(404).send();
			return;
		}
		const feed = await Post.find({
			$or: [{ userid: { $in: user.following } }, { userid: userid }],
		}); //returns all posts of all followed users
		if (!feed) {
			res.status(404).send();
			return;
		}
		res.status(200).send(feed);
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
 * Get all statistics for this user.
 */
router.get("/api/users/:id/statistics", mongoChecker, async (req, res) => {
	const userid = req.params.id;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	log(`fetching all statistics for user [${userid}]`);

	try {
		const stats = await Statistic.find({ userid: userid });
		if (!stats) {
			res.status(404).send();
			return;
		}
		res.status(200).send(stats);
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
 * Update this users profile with the fields
 */
router.post("/api/users/updateprofile", multipartMiddleware, mongoChecker, async (req, res) => {
	const bio = req.body.bio;
	log("updating user with bio: ", bio);
	//can only update when logged in
	if (!req.session.user) {
		res.status(401).send("Unauthorized");
		return;
	}
	var user = await User.findById(req.session.user);

	if (!user) {
		res.status(404).send();
		return;
	}

	if (req.files && "image" in req.files) {
		try {
			log("found image in request body, uploading to cloudinary...")
			cloudinary.uploader.upload(req.files.image.path, async (result) => {
				var image = {
					image_id: result.public_id,
					image_url: result.url,
					created_at: new Date(),
				};
			
			
				user.profilePicture = image;
				user.bio = bio;

				try {
					const userResult = await user.save();
					res.status(200).json({ user: userResult });
				}
				catch (error) {
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
	}
	else {
		//update bio only
		user.bio = bio;
		try {
			const userResult = await user.save();
			res.status(200).json({ user: userResult });
		}
		catch (error) {
			log(error);
			if (isMongoError(error)) {
				res.status(500).send("Internal Server Error");
			} else {
				res.status(400).send();
			}
		}	
	}
});

/**
 * Unfollow another user.
 */
router.post("/api/users/unfollow/:id", mongoChecker, async (req, res) => {
	const followid = req.params.id;

	if (!ObjectID.isValid(followid)) {
		res.status(404).send();
		return;
	}

	//can only follow other users when logged in
	if (!req.session.user) {
		res.status(401).send("Unauthorized");
		return;
	}

	try {
		var user = await User.findById(req.session.user);
		var follow = await User.findById(followid);
		if (!user || !follow) {
			res.status(404).send();
			return;
		}
		let follow_index = user.following.indexOf(followid);
		let user_index = follow.followers.indexOf(user._id);
		if (follow_index == -1 || user_index == -1) {
			res.status(400).send();
			return;
		}

		user.following.splice(follow_index, 1);
		follow.followers.splice(user_index, 1);

		const userResult = await user.save();
		const followResult = await follow.save();

		res.status(200).json({ user: userResult, follow: followResult });
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
 * Follow another user.
 */
router.post("/api/users/follow/:id", mongoChecker, async (req, res) => {
	const followid = req.params.id;

	if (!ObjectID.isValid(followid)) {
		res.status(404).send();
		return;
	}

	//can only follow other users when logged in
	if (!req.session.user) {
		res.status(401).send("Unauthorized");
		return;
	}

	try {
		const user = await User.findById(req.session.user);
		const follow = await User.findById(followid);
		if (!user || !follow) {
			res.status(404).send();
			return;
		}
		if (user.following.includes(followid)) {
			res.status(400).send("Already following this user")
			return;
		}

		user.following.push(followid);
		follow.followers.push(req.session.user);
		const userResult = await user.save();
		const followResult = await follow.save();
		res.status(200).json({ user: userResult, follow: followResult });

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
 * Delete this user with a particular id.
 * User must be an admin.
 */
router.delete("/api/users/:id", mongoChecker, async (req, res) => {
	if (!req.session.isAdmin) {
		res.status(401).send("Unauthorized");
		return;
	}

	const userid = req.params.id;

	if (!ObjectID.isValid(userid)) {
		res.status(404).send();
		return;
	}

	try {
		log(`deleting user [${userid}]`);
		const user = await User.findById(userid);
		user.remove();
		res.send(user);
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
