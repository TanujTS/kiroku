import { eq, ilike, sql } from 'drizzle-orm';
import db from '../db/index';
import { usersTable } from '../models/user.model'
import { ApiResponse } from '../utils/ApiReponse';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

const getAllUsers = asyncHandler(async (req, res) => {
    const search = req.query.search;

    if (search) {
        // const users = await db.select().from(usersTable).where(ilike(usersTable.name, `%${search}%`)) //costly operation for a large db, use indexes to avoid heavy operation

        const users = await db.select().from(usersTable).where(sql`to_tsvector('english', ${usersTable.name}) @@ to_tsquery('english', ${search})`);
        //more performant query, optimisation

        return res
            .status(200)
            .json(
                new ApiResponse(200, users, "Users fetched successfully!")
            )
    }

    const users = await db.select().from(usersTable);
    console.log("users fetched!");
    return res
        .status(200)
        .json(
            new ApiResponse(200, users, "Users fetched successfully!")
        )
})

const createUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        throw new ApiError(400, "User did not provide name or email address.")
    }
    const user = await db.insert(usersTable).values({
        name, email
    }).returning({ name: usersTable.name, email: usersTable.email })
    if (!user) {
        throw new ApiError(400, "Failed to create user.")
    }
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

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    if (!name || !email) {
        throw new ApiError(400, "Please provide either name or user id.")
    }
    const updatedUser = await db.update(usersTable)
        .set({ name, email })
        .where(eq(usersTable.id, id))
        .returning({ name: usersTable.name, email: usersTable.email })
    return res
        .status(200)
        .json(new ApiResponse(200, updatedUser, "Updated user successfully!"))
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await db.delete(usersTable).where(eq(usersTable.id, id));
    return res
        .status(200)
        .json(
            new ApiResponse(200, [], "Deleted!")
        )
})

export {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}