'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnect } from './mongo.js'
import authRoutes from "../src/auth/auth.routes.js"
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
import userRoutes from "../src/user/user.routes.js"


//Express realiza la solicitud a la base de datos.

// Configuraciones basicas del servidor
const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())// para que pueda responer
    app.use(helmet())//para cierto tipos de ataques.
    app.use(morgan('dev'))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/adoptionSystem/v1/auth", authRoutes)
    app.use("/adoptionSystem/v1/user",userRoutes)
}

const conectarDB = async () => {
    try {
        await dbConnect()

    } catch (err) {
        console.log(`Database connection failed: ${err}`)
    }
}

//Para utilizar el metodo anterior en todo el programa o servidor
export const initServer = () => {
    const app = express()
    try {
        //le paso express que es lo que se almaceno en app.
        middlewares(app)
        conectarDB()
        routes(app)
        //Para que el servidor escuche el puerto.
        app.listen(process.env.PORT)
        //Que imprima el proceso del puerto.
        console.log(`Server running on port ${process.env.PORT}`)

    } catch (err) {
        console.log(`Server init failed ${err}`)

    }
}