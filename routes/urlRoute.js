const express = require("express")
const urlModel = require("../model/url")
const userModel = require("../model/user")
const ShortUniqueId = require("short-unique-id")

const router = express.Router()
router.use(express.json())
router.post("/new", async (req, res) => {
	const data = {}
	const validFields = ["userId", "url", "shortName"]
	for (item in req.body) {
		if (validFields.includes(item)) {
			data[item] = req.body[item]
		}
	}
	console.log(data)
	try {
		if (data.shortName !== undefined) {
			const checkShortName = await urlModel.findOne({
				shortName: data.shortName,
			})
			if (checkShortName !== null) {
				return res.json({
					status: false,
					error: "Link name exists",
					errorOccured: "shortName",
					code: 101,
				})
			}
		}
	} catch (err) {
		res.json({
			status: false,
			erorr: err.message,
			errorOccured: errorOccured,
			errorDetails: err,
			code: 100,
		})
	}
	var newUrl = new urlModel()
	for (item in data) {
		newUrl[item] = data[item]
	}
	if (newUrl.shortName === undefined) {
		const uid = new ShortUniqueId()
		newUrl["shortName"] = uid()
	}
	try {
		const saveUrl = await newUrl.save()
		res.json({ status: true, data: saveUrl })
	} catch (err) {
		const errorOccured = []
		for (item in err.errors) {
			errorOccured.push(item)
		}
		res.json({
			status: false,
			erorr: err.message,
			errorOccured: errorOccured,
			errorDetails: err,
			code: 100,
		})
	}
})
router.get("/all/:userid", async (req, res) => {
	try {
		const findUser = await userModel.findById(req.params.userid)
		if (findUser === null) {
			return res.json({
				status: false,
				error: "No user found",
				errorMessage: "user",
			})
		}
	} catch (err) {
		return res.json({
			status: false,
			erorr: err.message,
			errorOccured: errorOccured,
			errorDetails: err,
		})
	}
	try {
		const getUrls = await urlModel.find({ userId: req.params.userid })
		return res.json({
			status: true,
			data: getUrls,
		})
	} catch (err) {
		return res.json({
			status: false,
			erorr: err.message,
			errorOccured: errorOccured,
			errorDetails: err,
		})
	}
})
module.exports = router
