var eyestatus = true
window.onload = () => {
	document.querySelector(".input.name").focus()
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
const errorMessage = (message, code) => {
	var error = document.querySelector(".error-message")
	error.innerHTML = message
}
