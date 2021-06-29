const express = require("express")
const mongoose = require("mongoose")
const sessions = require("express-session")
const MongoStore = require("connect-mongo")

const apiRoute = require("./routes/apiRoute")

const urlModel = require("./model/url")

const app = express()
app.use(express.json())

require("dotenv/config")
app.use(express.static(__dirname + "/css"))
app.use(express.static(__dirname + "/js"))
app.use(express.static(__dirname + "/images"))

app.set("view engine", "ejs")
app.enable("trust proxy")

const IN_PROD = process.env.NODE_ENV === "production"
const SESSION_EXPIRE = Number(process.env.SESSION_AGE) * 60 * 60 * 1000
app.use(
	sessions({
		name: process.env.SESSION_NAME,
		resave: false,
		saveUninitialized: false,
		secret: process.env.SESSION_SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.DB_CONNECTION,
		}),
		cookie: {
			sameSite: true,
			maxAge: SESSION_EXPIRE,
			secure: IN_PROD,
			httpOnly: false,
		},
	})
)
app.use("/api", apiRoute)
app.get("/@:shortname", async (req, res) => {
	try {
		const findUrl = await urlModel.findOne({ shortName: req.params.shortname })
		if (findUrl === null) {
			return res.send("<h1>error</error>")
		}
		return res.redirect(findUrl.url)
	} catch (err) {
		res.send("<h1>error</error>")
	}
})
app.get("/", (req, res) => {
	res.render("homepage")
})
app.get("/login", (req, res) => {
	res.render("login")
})
app.get("/signup", (req, res) => {
	res.render("signup")
})

mongoose.connect(process.env.DB_CONNECTION, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false,
})
app.listen(process.env.PORT || 3000)
