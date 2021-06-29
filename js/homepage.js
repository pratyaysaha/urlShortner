var urlCheck = false
var linkCount = 1
var allLinks = JSON.parse(window.localStorage.getItem("allLinks")) || []
allLinks.map((item, index) => {
	document.querySelector(".links").insertAdjacentHTML(
		"beforeend",
		`<div class="link-box l${linkCount}">
					<div class="their-link">
						<div class="their-the-link">${item.url}</div>
					</div>
					<div class="our-link">
						<div class="the-link l${linkCount}" onclick="window.open('${window.location.origin}/@${item.shortName}')">${window.location.origin}/@${item.shortName}</div>
						<div class="copy-button" onclick="copyLink('${linkCount}')" title="Copy Link">
							<i class="fas fa-copy"></i>
						</div>
					</div>
					<div class="copy-button-big" onclick="copyLink('${linkCount}')" title="Copy Link">
							Copy
						</div>
				</div>`
	)
	linkCount += 1
})
function validURL(str) {
	var pattern = new RegExp(
		"^(https?:\\/\\/)?" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	) // fragment locator
	return !!pattern.test(str)
}
const checkURL = (val) => {
	urlCheck = validURL(val)
}
const copyLink = async (index) => {
	const link = document.querySelector(`.the-link.l${index}`).innerHTML
	await navigator.clipboard.writeText(link)
}
const errorMessage = (err, time = 2000, redirectLogin = false) => {
	document.querySelector(".error-message").style.display = "block"
	document.querySelector(".error-message").innerHTML = err
	setTimeout(function () {
		document.querySelector(".error-message").style.display = "none"
	}, time)
	if (redirectLogin) {
		location.assign(`${window.location.origin}/login`)
	}
	return
}
const shortenMe = async () => {
	if (document.querySelector(".input.link").value === "") {
		errorMessage("Enter an URL")
		return
	}
	if (allLinks.length >= 3) {
		errorMessage("To get more, Log In", 2000, true)
		return
	}
	const data = {
		url: document.querySelector(".input.link").value,
	}
	if (!urlCheck) {
		errorMessage("❌ Not a valid url ❌")
		return
	}
	const url = `${window.location.origin}/api/url/new`
	try {
		const response = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=utf-8" },
			body: JSON.stringify(data),
		})
		const getLink = await response.json()
		console.log(getLink)
		if (getLink.status) {
			console.log(getLink)

			document.querySelector(".links").insertAdjacentHTML(
				"beforeend",
				`<div class="link-box l${linkCount}">
					<div class="their-link">
						<div class="their-the-link">${getLink.data.url}</div>
					</div>
					<div class="our-link">
						<div class="the-link l${linkCount}" onclick="window.open('${window.location.origin}/@${getLink.data.shortName}')">${window.location.origin}/@${getLink.data.shortName}</div>
						<div class="copy-button" onclick="copyLink('${linkCount}')" title="Copy Link">
							<i class="fas fa-copy"></i>
						</div>
					</div>
				</div>`
			)
			allLinks.push({
				url: getLink.data.url,
				shortName: getLink.data.shortName,
			})
			window.localStorage.setItem("allLinks", JSON.stringify(allLinks))
			linkCount += 1
			document.querySelector(".input.link").value = ""
		} else {
			document.querySelector(".error-message").style.display = "block"
			document.querySelector(".error-message").innerHTML = "❌ Error ❌"
			setTimeout(function () {
				document.querySelector(".error-message").style.display = "none"
			}, 2000)
			return
		}
	} catch (err) {}
}
