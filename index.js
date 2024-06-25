const express = require('express')
const { connectToMongoDB } = require('./services/db_service');
const urlRouter = require('./routes/urlRoutes');

const app = express()
const PORT = 8001

connectToMongoDB("mongodb://127.0.0.1:27017/URL-Shortner");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/url', urlRouter);

app.listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`)
});