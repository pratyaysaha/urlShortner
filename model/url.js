const mongoose = require("mongoose")
require("mongoose-type-url")
const url = mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
	},
	url: {
		type: mongoose.SchemaTypes.Url,
		required: true,
	},
	shortName: {
		type: String,
		unique: true,
	},
})
module.exports = mongoose.model("url", url)
