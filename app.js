require('dotenv').config();

const http = require('http');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const route = require('./api/routes');
const { AppDataSource } = require('./api/models/data_source');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//app.use(route);

app.get('/ping', (req, res) => {
    return res.status(200).json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
    try {
        await AppDataSource.initialize();

        server.listen(PORT, () =>
            console.log(`Server is listening on ${PORT}`)
        );
    } catch (err) {
        console.error(err);
    }
};
start();
