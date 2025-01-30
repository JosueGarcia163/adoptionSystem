import User from "../user/user.model.js"
import { hash } from "argon2"

export const register = async (req, res) => {
    try {
        const data = req.body
        //Si en el request file viene filaname se guarda y si no viene se almacena null.
        let profilePicture = req.file ? req.file.filename: null
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

