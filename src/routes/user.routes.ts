import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/users.controller";


const router = Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser)

router.route('/:id')
    .get(getUserById)

export default router