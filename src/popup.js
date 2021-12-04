document.addEventListener("DOMContentLoaded", () => {

	chrome.tabs.getSelected(null, (tab) => {
		document.getElementById("textbox").value = tab.url
		load_qr()
	})

	document.querySelector("#close").onclick = () => {
		window.close()
	}

	document.querySelector("#textbox").onchange = () => {
		load_qr()
	}

	document.querySelector("#textbox").onkeyup = () => {
		load_qr()
	}

	document.querySelector("#download").onclick = () => {
		//todo change file name to url?
		download("qr_code.gif", document.querySelector("#qrcode img").src);
	}

})

function load_qr () {
	//todo size rework
	let max_window_height = 600
	let max_qrcode_height = max_window_height - 75 // Reserve "some" space for UI

	let qr = qrcode(0, "M")
	qr.addData(document.querySelector("#textbox").value)
	qr.make()
	document.querySelector("#qrcode").innerHTML = qr.createImgTag(Math.floor(max_qrcode_height / 57), 4)
}

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
  
	element.style.display = 'none';
	document.body.appendChild(element);
  
	element.click();
  
	document.body.removeChild(element);
}