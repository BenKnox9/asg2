const dotenv = require('dotenv')
const path = require('path');
const express = require('express');
const bird_router = require('./routers/bird_router');
const image_router = require('./routers/image_router');
const bodyParser = require('body-parser');

/* load .env */
dotenv.config();

/* create Express app */
const app = express();


// Database
const mongoose = require("mongoose");
const Bird = require('./models/birdSchema');

const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;
// const db_url = `mongodb+srv://adminguy:7X6FaeVdExWaiHMn@cluster0.dmezaic.mongodb.net/?retryWrites=true&w=majority`
const db_url = `mongodb+srv://${user}:${password}@cluster0.dmezaic.mongodb.net/?retryWrites=true&w=majority`
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(db_url, options).then(() => {
    console.log('successfully connected!')
}).catch((e) => {
    console.error(e, 'could not connect!')
});
/* setup Express middleware */
// Pug for SSR (static site rendering)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// TODO: middleware for parsing POST body

app.use(bodyParser.json());


// TODO: middleware for uploading files

/* host static resources (.css, .js, ...) */
app.use('/images/', image_router);
app.use('/', express.static(path.resolve(__dirname, 'public/')));

/* redirect root route `/` to `/birds/` */
app.get('/', (request, response) => {
    response.redirect('/birds/');
});

app.use('/birds/', bird_router);

// TODO: 404 page
app.get('*', (request, response) => {
    response.status(404);
    response.render('404_not_found')
});

// TODO: connect to a database

/* start the server */
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is live http://localhost:${PORT}`);
});

