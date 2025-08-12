import { eq, or } from "drizzle-orm";
import db from "../db";
import { Users } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import { hash } from "bcrypt-ts";
import { ApiResponse } from "../utils/ApiReponse";


export const signUp = asyncHandler(async(req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        throw new ApiError(400, "Email, username or password missing.")
    }

    const existingUser = await db.select().from(Users).where(or(
        (eq(username, Users.username), 
        eq(email, Users.email))));

    if (existingUser.length > 0) {
        throw new ApiError(400, "User with the same username/email already exists!");
    }
    

    const hashedPassword = await hash(password, 10);

    const [user] = await db.insert(Users).values({
        username, email, password: hashedPassword
    }).returning({username: Users.username});

    return res
    .status(201)
    .json(
        new ApiResponse(201, user, "Created user.")
    )
})
