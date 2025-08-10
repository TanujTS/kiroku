import { eq, sql } from "drizzle-orm";
import db from "../db";
import { blogModel } from "../models/blog.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiReponse";
import { ApiError } from "../utils/ApiError";


const getAllBlogs = asyncHandler(async (req, res) => {
    const search = req.query.params;
    if (search) {
        const blogs = await db.select().from(blogModel).where(sql`to_tsvector('english', ${blogModel.title}) @@ to_tsquery('english', ${search})`);
        return res
        .status(200)
        .json(
            new ApiResponse(
                200, blogs, "Blogs fetched successfully!"
            )
        )
    }
    const blogs = await db.select().from(blogModel);
    return res
    .status(200)
    .json(
        new ApiResponse(
            200, blogs, "Blogs fetched successfully!"
        )
    )
})

const createBlog = asyncHandler(async(req, res) => {
    const { title, content, owner } = req.body;
    if (!title || !content || !owner) {
        throw new ApiError(400, "Please provide title, content and owner of the blog.")
    }
    const blog = await db.insert(blogModel).values({
        title, content, owner
    })
    .returning();

    return res
    .status(201)
    .json(
        new ApiResponse(200, blog, "Created OK")
    )
})

const updateblog = asyncHandler(async(req, res) => {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const blog = await db.update(blogModel)
    .set({title, content})
    .where(eq(blogModel.id, blogId))
    .returning({title: blogModel.title, content: blogModel.content})
    return res
    .status(200)
    .json(
        new ApiResponse(200, blog, "Updated blog data.")
    )
})

const deleteBlog = asyncHandler(async(req, res) => {
    const blogId = req.params.id;
    await db.delete(blogModel).where(eq(blogModel.id, blogId));
    return res
    .status(200)
    .json(
        new ApiResponse(200, [], "Deleted blog successfully!")
    )
})

export {
    getAllBlogs,
    createBlog,
    updateblog,
    deleteBlog
}