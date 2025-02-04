import {Router} from "express";
import {register, login} from "./auth.controller.js"
import { registerValidator , loginValidator} from "../middlewares/check-validator.js";
import { uploadProfilePicture } from "../middlewares/multer-upload.js";



const router = Router()

//Ruta, middleware, controlador
router.post("/register", 
    uploadProfilePicture.single("profilePicture"),
    registerValidator, 
    register
)

//le paso el middleWare y el controlador "login"
router.post("/login", loginValidator, login)

export default router


