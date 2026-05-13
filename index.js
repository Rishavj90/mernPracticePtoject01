const express = require("express");
const { router  } = require('./routes/api_user')
const User_router = require('./routes/user')
const { logData } = require('./middleware')
const {connectMongoDB} = require('./connection')


const app = express();

//connect to mongo db
connectMongoDB('mongodb://127.0.0.1:27017/myApp')

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(logData());

//routes
app.use('/api', router);
app.use('/users', User_router);



app.listen(8080, () => {
    console.log('running on localhost:8080');
})


