/* Image mongoose model */
const mongoose = require("mongoose");

// create an image schema
const ImageSchema = mongoose.Schema({
	image_id: {
		type: String,
		required: true,
	},
	image_url: {
		type: String,
		required: true,
	},
	created_at: String,
});

module.exports = { ImageSchema };
