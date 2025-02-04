import User from "./user.model.js"
import { hash, verify } from "argon2";


export const getUserById = async (req, res) => {

    try {
        // se usa para obtener los parámetros de la URL en una ruta dinámica.
        const { uid } = req.params
        const user = await User.findById(uid)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "usuario no existe",
                error: err.message

            })

        }
        return res.status(200).json({
            success: true,
            user

        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el usuario",
            error: err.message

        })

    }

}

export const getUsers = async (req, res) => {

    try {
        //traer los usuarios en cierta cantidad
        const { limits = 3, from = 0 } = req.query
        const query = { status: true }

        const [total, users] = await Promise.all([
            //2 promesa una que cuenta documentos
            User.countDocuments(query),
            //Promesa que busca segun los parametros seleccionados
            User.find(query)
                .skip(Number(from))
                .limit(Number(limits))

        ])

        return res.status(200).json({
            success: true,
            total,
            users

        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los usuarios",
            error: err.message

        })
    }

}

export const deleteUser = async (req, res) => {
    try {
        const { uid } = req.params

        const user = await User.findByIdAndUpdate(uid, { status: false }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Usuario Eliminado",
            user


        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar los usuarios",
            error: err.message

        })
    }


}

//Metodo para actualizar contraseña
export const updatePassword = async (req, res) => {
    try {
        const { uid } = req.params
        const { newPassword } = req.body

        const user = await User.findById(uid)

        const matchPassword = await verify(user.password, newPassword)

        if (matchPassword) {
            return res.status(400).json({
                success: false,
                message: "La nueva contraseña no puede ser igual a la anterior"
            })
        }

        //Encriptamos la nueva password con hash y la guardamos en la constante
        const encryptedPassword = await hash(newPassword)

        //Buscamos por medio del id y actualizamos la password.
        await User.findByIdAndUpdate(uid, { password: encryptedPassword })

        //Mandamos mensaje si se actualizo la password de forma correcta.
        return res.status(200).json({
            success: true,
            message: "Contraseña actualizada"
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar los contraseña",
            error: err.message

        })
    }

}


