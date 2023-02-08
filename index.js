const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('./utils/elephantSQL.js');
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:3000','http://localhost:3000/login']

var corsOptions = {
    origin:allowedOrigins,
    credentials:true
}

const userRouter = require('./routes/userRoutes.js');
const imageRouter = require('./routes/imageRoutes.js');

const middle404 = require('./middlewares/error404.js');

app.use(express.json());
app.use(cors(corsOptions));
app.use('/api',userRouter);
app.use('/api/image',imageRouter);
app.use(cookieParser());



app.use(middle404);
app.listen(port);

console.log('App is listening on port ' + port);