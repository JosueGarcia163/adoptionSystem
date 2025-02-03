import {Router} from "express";
import { deleteUserValidator, getUserByIdValidator } from "../middlewares/check-validator.js";
import { getUserById, getUsers, deleteUser , updatePassword} from "./user.controller.js";
const router = Router()

router.get("/findUser/:uid", getUserByIdValidator, getUserById)

router.get("/", getUsers)

router.delete("/deleteUser/:uid", deleteUserValidator, deleteUser)

router.patch("/updatePassword/:uid", updatePassword)

export default router
