const router = require('express').Router();
const fs = require('fs/promises');
const { exec } = require('child_process');

router.post('/js', jsHandler);

async function jsHandler(req, res) {

	const data = req.body;
	console.log(data);

	try {
		await fs.writeFile('playground/main.js', data.code);
	} catch (error) {
		console.error('Error: Unable to write to file', err);
		res.end();
	}

	exec("node playground/main.js", (error, stdout, stderr) => {
	    if (error) {
	        res.send({
	        	out: 'Could not execute. Check your code for potential errors'
	        })
	    }
	    if (stderr) {
	    	res.send({
	        	out: 'Could not execute. Check your code for potential errors'
	        });
	    }
	    res.send({
	    	out: stdout.toString()
	    });
	});
}

module.exports = router;
