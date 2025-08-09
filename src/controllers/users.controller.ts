import { eq } from 'drizzle-orm';
import db from '../db/index';
import { usersTable } from '../models/user.model'
import { ApiResponse } from '../utils/ApiReponse';
import { asyncHandler } from '../utils/asyncHandler';

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await db.select().from(usersTable);
    console.log("users fetched!");
    res
    .status(200)
    .json(
        new ApiResponse(200, users, "Users fetched successfully!")
    )
})

const createUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    const user = await db.insert(usersTable).values({
        name, email
    })
    .returning({
        name, email
    })
    return res
    .status(201)
    .json(
        new ApiResponse(200, user, "Created OK")
    )
})

const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const [user] = await db.select().from(usersTable).where(table => eq(table.id, id)).limit(1);
    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Fetched user profile succesfully!")
    )
})




export {
    getAllUsers,
    createUser,
    getUserById
}