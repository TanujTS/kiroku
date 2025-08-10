import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, updateblog } from "../controllers/blog.controller";


const router = Router();

router.route('/')
    .get(getAllBlogs)
    .post(createBlog)

router.route('/:id')
    .patch(updateblog)
    .delete(deleteBlog)

export default router