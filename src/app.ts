import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from 'express';
import { auth } from "./utils/auth";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.all("/api/auth/*", toNodeHandler(auth));
//Middlewares
app.use(express.json({
    limit: "16kb",
}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
// app.use(cookieParser());



//router


//routes declaration
app.get("/api/me", async (req, res) => {
 	const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
	return res.json(session);
});

//http://localhost:8000/api/v1/users/register
export {app}