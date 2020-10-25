if(Number(localStorage.darkMode) === 1) {
	body.classList.add("dark-mode");
	document.querySelector('#darkmode-switch').setAttribute("checked", "checked");
}
