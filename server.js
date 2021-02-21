const path = require('path');
const express = require('express');

const executeHandler = require('./routes/execute');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views/index.html'));
})

app.use('/execute', executeHandler);

app.listen('3000', () => {
    console.log('Server running...');
});
