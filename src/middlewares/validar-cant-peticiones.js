/*Sirve para poder detener las peticiones por ip, por si ya son muchas enviadas 
y evitar que se caiga el servidor los cuales son los ataques DDoS*/
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    //Maximas 50 peticiones por minuto.
    windowMs: 15 * 60 * 1000,
    max: 50
})

export default apiLimiter

