document.addEventListener("DOMContentLoaded", () => {

	chrome.tabs.getSelected(null, (tab) => {
		document.getElementById("textbox").value = tab.url
		load_qr()
	})

	document.getElementById("close").onclick = () => {
		window.close()
	}

	document.getElementById("textbox").onchange = () => {
		load_qr()
	}

	document.getElementById("textbox").onkeyup = () => {
		load_qr()
	}

})

function load_qr () {
	//todo size rework
	let max_window_height = 600
	let max_qrcode_height = max_window_height - 75 // Reserve "some" space for UI

	let qr = qrcode(0, "M")
	qr.addData(document.getElementById("textbox").value)
	qr.make()
	document.getElementById("qrcode").innerHTML = qr.createImgTag(Math.floor(max_qrcode_height / 57), 4)
}