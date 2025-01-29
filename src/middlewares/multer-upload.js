import multer from "multer";
import { dirname, extname, join } from "path"

import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
//Configuramos las extensiones que el usuario va a poder subir.
const MIMETYPES = ["image/jpeg", "image/png", "image/jpg"]

//tamaño maximo del archivo
const MAX_SIZE = 100000000

const createMulterConfig = (destinationPath) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                //Unimos el current_dir y la destinationPath
                const fullPath = join(CURRENT_DIR, destinationPath)
                req.filePath = fullPath;
                cb(null, fullPath)
            },
            filename: (req, file, cb) => {
                //Extraemos la extension.
                const fileExtension = extname(file.originalname)
                //split para separar valores
                const fileName = file.originalname.split(fileExtension)[0]
                cb(null, `${fileName}-${Date.now()}${fileExtension}`)

            }

        }),
        fileFilter: (req, file, cb) => {
            //Si esta incluido file.mimetype es responde null
            if (MIMETYPES.includes(file.mimetype)) cb(null, true)
            else cb(new Error(`Solamente se aceptan archivos de los siguientes tipos ${MIMETYPES.join(" ")}`))

        },
        limits:{
            fileSize: MAX_SIZE

        }

    })


}
    export const uploadProfilePicture = createMulterConfig("../../public/uploads/profile-pictures")
    export const uploadPetPicture = createMulterConfig("../public/uploads/pet-pictures")
