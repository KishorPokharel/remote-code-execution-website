const cm = new CodeMirror.fromTextArea(document.getElementById("editor"), {
	lineNumbers: true,
	mode: "javascript",
	theme: "ayu-mirage"
});

const editor = document.getElementById('editor');
const runBtn = document.querySelector('.run-btn');
const output = document.querySelector('.output');

async function executeCodeRequest(data) {
	let res = await fetch('/execute/js', {
		method: 'POST',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	});

	let out = await res.json();
	output.innerText = out.out;
}

runBtn.addEventListener('click', function () {
	let code = cm.getValue();

	let data = {
		code
	};

	executeCodeRequest(data);
});

