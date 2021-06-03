const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const programRoutes = require('./routes/program.routes');

const app = express();
const DB = process.env.DB;
const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

app.use(cors());

const db = require('./models/models');
const Role = db.role;

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     next();
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', programRoutes);

// app.use((error, req, res, next) => {
//     console.log(error);
//     const status = error.statusCode || 500;
//     const message = error.message;
//     const data = error.data;
//     res.status(status).json({ message: message, data: data });
// });

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Fitsoft application." });
});

const dbURI = `mongodb://${HOST}:/${DB}`;
// const dbURI = `mongodb+srv://fitsoft-cw:Rzj3g0VWR4eKqMAw@fitsoft.e61kn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDb');
    initial();
})
.catch(err => {
    console.error("Connection error", err);
    process.exit();
});

app.listen(PORT);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });

            new Role({
                name: "customer"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'customer' to roles collection");
            });
        }
    });
}
