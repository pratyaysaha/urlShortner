var eyestatus = true
var emailValid = false
window.onload = () => {
	document.querySelector(".input.email").focus()
}
const eyechange = (me) => {
	if (eyestatus) {
		me.innerHTML = '<i class="fas fa-eye-slash"></i>'
		eyestatus = false
		document.querySelector(".input.password").type = "text"
	} else {
		me.innerHTML = '<i class="fas fa-eye"></i>'
		eyestatus = true
		document.querySelector(".input.password").type = "password"
	}
}
const validEmail = (email) => {
	var mailformat =
		/^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/
	if (email.value.match(mailformat)) {
		email.style.color = "#fff"
		emailValid = true
		return true
	} else {
		email.focus()
		email.style.color = "red"
		emailValid = false
		return false
	}
}
const clearForm = () => {
	var input = document.getElementsByTagName("input")
	input.value = ""
	document.getElementsByTagName("select").value = "Role"
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
const submit = () => {
	if (!emailValid) {
		errorMessage("❗❗ Not a valid email ❗❗")
		return
	}
	const data = {
		email: document.querySelector(".input.email").value,
		password: document.querySelector(".input.password").value,
	}
	for (item in data) {
		if (data[item] === "" || data[item] === " ") {
			errorMessage(`Provide a valid ${item}`)
		}
	}
	const url = `${window.location.origin}/api/user/login`
	fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json;charset=utf-8" },
		body: JSON.stringify(data),
	})
		.then((res) => res.json())
		.then((back) => {
			if (back.status) {
				location.assign(`${window.location.origin}/index`)
			} else {
				errorMessage(`${back.error}`)
			}
		})
}
