import User from "../user/user.model.js"

//helper no tiene acceso al request ni al response.
export const existeEmail = async(email = '') => {
    const existe = await User.findOne({email
    })
    if(existe){
            throw new Error (`El email ${email} ya fue registrado previamente`)

    }


}