import { Schema, model } from "mongoose";

//Esquema del documento que voy a almacenar en mongo
const userSchema = Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]

    },
    surname: {
        type: String,
        required: [true, "surname is required"],
        maxLength: [25, "surname cannot exceed 25 characters"]
    },
    username: {
        type: String,
        unique: true,
        required: true

    },

    password:{
        type: String,
        minLength: 8,
        required: true


    },

    email: {
        type: String,
        required: [true, "Email is required"],
        //Para que sea unico
        unique: true
    },

    profilePicture: {
        type: String,

    },

    phone: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 8

    },

    role: {
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "USER_ROLE"]
    },

    status: {
        type: Boolean,
        default: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
)

userSchema.methods.toJSON = function(){
    const{ password, _id, ...user} = this.toObject()
    user.uid = _id
    return user

}

// Exportamos el esquema para utilizarlo
export default model("User", userSchema)

