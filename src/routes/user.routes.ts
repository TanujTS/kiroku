import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/users.controller";


const router = Router();

router.route('/')
    .get(getAllUsers)
    .post(createUser)




export default router