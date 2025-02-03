import jwt from "jsonwebtoken"

export const generateJWT = (uid = "") => {
    return new Promise ((resolve, reject) => {
        const payload = {uid}

        jwt.sign(
            payload,
            process.env.SECRET_KEY,
            {
                //Aqui se le manda el tiempo de vida.
                expiresIn:"1h"
            },
            (err, token) => {
                if(err){

                    reject({
                        success: false,
                        message: err.message
                    })
                }else{
                    resolve({
                        success: true,
                        token

                    })

                }

            }
        )
    })

}