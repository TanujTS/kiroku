import cors from "cors";
import express from 'express';

const app = express();

//Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json({
    limit: "16kb",
}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(cookieParser());



//router
import usersRouter from './routes/user.routes';
import blogRouter from './routes/blog.routes'

app.use('/users', usersRouter);
app.use('/blogs', blogRouter)


//routes declaration


//http://localhost:8000/api/v1/users/register
export {app}