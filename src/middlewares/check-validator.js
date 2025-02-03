import { body, param } from "express-validator";
import { existeEmail, existeUsername, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { deleteFileOnError } from "./delete-file-on-error.js";

export const registerValidator = [
    body("name", "El nombre es obligatorio").not().isEmpty(),
    body("username", "El username es obligatorio").not().isEmpty(),
    body("email", "El correo es obligatorio").not().isEmpty(),
    //De que sea un correo valido
    body("email", "Ingrese un correo valido").isEmail(),
    //Miramos que no este registrado previamente
    body("email").custom(existeEmail),
    body("username").custom(existeUsername),


    /* body("password").isStrongPassword({
         minLength: 8,
         minLowercase: 1,
         minUppercase: 1,
         minNumbers: 1,
         minSymbols: 0
 
     }),*/
    validarCampos,
    deleteFileOnError
]

//Validaciones del login
export const loginValidator = [
    body("email").optional().isEmail().withMessage("Ingrese un correo valido"),
    body("username").optional().isString().withMessage("Ingrese un username valido"),
    body("password").isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]

//validaciones del UserValidator
export const getUserByIdValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const deleteUserValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(userExists),
    validarCampos,
    deleteFileOnError
]

export const updatePasswordValidator = [
    param("uid").isMongoId().withMessage("No es un ID valido"),
    param("uid").custom(userExists),
    body("newPassword").isLength({min: 8}).withMessage("La password debe de tener al menos 8 caracteres"),
    validarCampos,
    deleteFileOnError
]





