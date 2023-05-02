export function getfavoriteThingsToImages() {
	const favoriteThings = {
		Bananas: "https://pixy.org/src/442/thumbs350/4428098.jpg",
		Hockey: "https://pixy.org/src/428/4282288.jpeg",
		Salads: "https://pixy.org/src/419/4197778.jpeg",
		Jogging: "https://pixy.org/src/86/865694.jpg",
		Skiing: "https://pixy.org/src/107/1074423.jpg",
		Tennis: "https://pixy.org/src/183/thumbs350/1838426.jpg",
		"Push-ups": "https://pixy.org/src/183/thumbs350/1830402.jpg",
		Biking: "https://pixy.org/src/336/thumbs350/3368963.jpg",
		Basketball: "https://pixy.org/src/76/760790.jpg",
		Smoothies: "https://pixy.org/src/395/thumbs350/3957381.jpg",
		Weights: "https://pixy.org/src/223/thumbs350/2239559.jpg"
	};

	return favoriteThings;
}

export function getfavoriteThings() {
  return ["Bananas", "Hockey", "Salads", "Jogging", "Skiing", "Tennis", "Push-ups",
          "Biking", "Basketball", "Smoothies", "Weights"];
}

// The key of the user whose profile page was last displayed (or is otherwise being displayed).
const currentUser = 0;

export function setCurrentUser(id) {
	currentUser = id;
}

export function getCurrentUser() {
	return currentUser;
}

// The key of the user that is logged in
const loggedInUser = 0;

export function getLoggInUser() {
	return loggedInUser;
}

export function getUsersAsList() {
  return Object.values(users);
}

// The user with key 0 is the logged-in user.
let users = {
	'0': {
    uid: 0,
		firstName: "John",
		lastName: "Doe",
		username: "johndoe_99",
		profilePic:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		bio:
			"Hi, my name is John and I like to run. Bananas are my favorite fruit because they're easy to pack.",
		favoriteThings: ["Bananas", "Jogging", "Hockey", "Salads"],
		posts: [
			{
				tag: "Fitness",
				content: {
					text: "What do you guys think of my new kicks?!",
					have_pic: 1,
					picture:
						"https://www.womenshealthsa.co.za/wp-content/uploads/2019/03/PUMA-Hybrid-NX-TZ.jpg",
				},
				uid: 0,
				comments: [
					{
						uid: 1,
						comment: "Looks like you figured out how to post a pic!",
					},
					{
						uid: 2,
						comment: "Fresh! Where from? I might have to get myself a pair!",
					},
				],
				likes: [1, 2],
			},
			{
				tag: "Help",
				content: {
					text:
						"How do I post a picture?! I NEED to show off my new kicks!!!!!",
					have_pic: 0,
					picture: "",
				},
				uid: 0,
				comments: [
					{
						uid: 0,
						comment:
							"Click on 'add image' after clicking the '+' icon on the home page!",
					},
				],
				likes: [3],
			},
		],
		following: [1, 3, 4],
		followers: [1, 3],
		numFollowing: 3,
		numFollowers: 2,
		stats: [
			{
				category: 'Fitness',
				stats: [
					{   
						id: 1, //id assigned by database code
						type: 'scatter',
						title: "Jogging Distance Stats",
						xAxes: "day",
						yAxes: "distance ran",
						data: [{x: 1, y: 1}, {x: 2, y: 5}, {x: 3, y: 3}, {x: 4, y: 4}, {x: 5, y: 5}]
					},
					{
						id: 2,
						type: 'scatter',
						title: "Bench Press Stats",
						xAxes: "day",
						yAxes: "kg pressed",
						data: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 5}]
					},
					{
						id: 3,
						type: 'scatter',
						title: "Squat PR",
						xAxes: "day",
						yAxes: "kg squatted",
						data: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 5}]
					},
					{
						id: 4,
						type: 'scatter',
						title: "Deadlift PR",
						xAxes: "day",
						yAxes: "kg deadlifted",
						data: [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 5, y: 5}]
					},
	
			 ]
			},
			{
				category: 'Nutriton',
				stats: [
					{
						type: 'scatter',
						title: "Calories in the day",
						xAxes: "day",
						yAxes: "calories",
						data: [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 4, y: 2}, {x: 5, y: 2}]
					}
				]
			}  
		]
	},
	'1': {
    uid: 1,
		firstName: "Cathy",
		lastName: "Jones",
		username: "basketballfan23",
		profilePic:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		bio:
			"‘You must expect great things of yourself before you can do them.’ - MJ",
		favoriteThings: ["Basketball", "Push-ups"],
		posts: [
			{
				tag: "Fitness",
				content: {
					text: "Hitting the gym early todayyy!",
					have_pic: 1,
					picture: "https://pixy.org/src2/587/5879220.jpg",
				},
				uid: 1,
				comments: [{ uid: 0, comment: "I'm still in bed lol" }],
				likes: [0],
			},
		],
		following: [0, 2, 3, 4],
		followers: [0, 3, 4],
		numFollowing: 4,
		numFollowers: 3,
	},
	'2': {
    uid: 2,
		firstName: "Jim",
		lastName: "Lu",
		username: "jimmmmlu",
		profilePic:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		bio: "bikes r life",
		favoriteThings: ["Biking"],
		posts: [],
		following: [3, 4],
		followers: [1, 3, 4],
		numFollowing: 2,
		numFollowers: 3,
	},
	'3': {
    uid: 3,
		firstName: "Nikolas",
		lastName: "Karlsson",
		username: "nikolas.karlsson",
		profilePic:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		bio: "This app really motivates me to stay fit! I use it everyday! :)",
		favoriteThings: ["Hockey", "Skiing", "Smoothies"],
		posts: [
			{
				tag: "Lifestyle",
				content: {
					text: "I'm skiing with the boys todayyyy",
					have_pic: 1,
					picture: "https://pixy.org/src2/595/5950971.jpg",
				},
				uid: 3,
				comments: [
					{ uid: 0, comment: "Im still in bed lol" },
					{ uid: 1, comment: "Cool!" },
					{ uid: 2, comment: "So much snow... where r u?" },
				],
				likes: [0, 1, 2, 3, 4],
			},
			{
				tag: "Reciepe",
				content: {
					text:
						"1 banana, 1 apple, 250mL cashew milk, 2 kiwis, 1 carrot, handful of berries - soooo gooood!!!",
					have_pic: 1,
					picture: "https://pixy.org/src/14/141396.jpg",
				},
				uid: 3,
				comments: [
					{ uid: 0, comment: "great - now i want one" },
					{ uid: 4, comment: "We should grab smoothies some time!" },
				],
				likes: [0, 2, 3],
			},
		],
		following: [0, 1, 2, 4],
		followers: [0, 1, 2, 4],
		numFollowing: 4,
		numFollowers: 4,
	},
	'4': {
		uid: 4,
		firstName: "Michael",
		lastName: "Miller",
		username: "mikenike",
		profilePic:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		bio: "Yoooo it's Mike you already know where its at I keep that fitness game strong.",
		favoriteThings: ["Weights", "Smoothies", "Bananas", "Biking", "Salads"],
		posts: [
			{
				tag: "Lifestyle",
				content: {
					text: "6AM y'all already know where I'm at! ",
					have_pic: 1,
					picture: "https://pixy.org/src/484/4848268.jpg",
				},
				uid: 4,
				comments: [
					{ uid: 0, comment: "Consistency is key dude.. keep at it." }
				],
				likes: [0, 1, 2, 3, 4],
			}
		],
		following: [1, 2],
		followers: [1, 2, 0],
		numFollowing: 2,
		numFollowers: 3,
	},
	'5': {
    uid: 5,
		firstName: "Jennifer",
		lastName: "Jones",
		username: "jennifer9375082",
		profilePic:
			"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png",
		bio: "",
		favoriteThings: [],
		posts: [],
		following: [],
		followers: [],
		numFollowing: 0,
		numFollowers: 0,
	},
};

export function getUsers() {
	return users;
}

export function setLikes(uid, postIndex, likes) {
	users[uid].posts[postIndex].likes = likes;
}
