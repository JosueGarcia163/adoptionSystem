import {Router} from "express";
import { deleteUserValidator, getUserByIdValidator } from "../middlewares/check-validator.js";
import { getUserById, getUsers, deleteUser } from "./user.controller.js";
const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

export default router
