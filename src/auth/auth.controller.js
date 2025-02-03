
import User from "../user/user.model.js"
import { hash, verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js"

export const register = async (req, res) => {
    try {
        const data = req.body
        //Si en el request file viene filaname se guarda y si no viene se almacena null.
        let profilePicture = req.file ? req.file.filename : null
        console.log(data)
        const encryptedPassword = await hash(data.password)
        data.password = encryptedPassword
        data.profilePicture = profilePicture
        const user = await User.create(data)
        console.log("hola llegue al servidor")
        return res.status(201).json({
            message: "User has been registered",
            name: user.name,
            email: user.email

        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({
            message: "User registration failed",
            error: err.message

        })
    }




}

export const login = async (req, res) => {
    //capturamos los siguientes parametros
    const { email, username, password } = req.body
    try {
        const user = await User.findOne({
            //Operadores de mongodb
            //Nos va a dar la funcionalidad del login con user o con email.
            $or: [{ email: email }, { username: username }]



        })
        //Validacion si el usuario no se encuentra
        if (!user) {
            return res.status(404).json({
                message: "Credenciales invalidas",
                error: "Username o email no existe en la base de datos."

            })

        }
        //Validacion de la contraseña si coincide true y si no coincide false
        const validPassword = await verify(user.password, password)

        //Si la contraseña no coincidio osea false entra a esta validacion.
        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales invalidas",
                error: "Contraseña incorrecta"

            })
        }
        const token = await generateJWT(user.id)
        return res.status(200).json({
            message: "Inicio de sesion exitoso",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture

            }

        })


    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Error de inicio de sesion",
            error: err.message

        })
    }


}



