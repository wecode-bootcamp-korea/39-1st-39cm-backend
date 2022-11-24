require('dotenv').config();

const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { router } = require('./api/routes');
const { appDataSource } = require('./api/models/data_source');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    res.status(err.statusCode).json({ message: err.message });
});

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        await appDataSource.initialize();

        server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};
start();
