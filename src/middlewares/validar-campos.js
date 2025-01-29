import {validationResult} from "express-validator";

export const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    //Si hay errores entra en esta validacion
    if(!errors.isEmpty()){
        //400 significa bad request.
        return next(errors)

    }
    //Determinar que se termino la tarea
    next();

    
}

