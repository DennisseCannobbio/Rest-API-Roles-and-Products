import {ROLES} from '../models/Role'
import User from '../models/User'

// Funcion para ver si el rol está repetido
export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    // Buscamos el usuario por el name
    const user = User.findOne({username: req.body.username})

    // Si el usuario existe le enviamos un mensaje de que el usuario existe
    if(user) return res.status(400).json({message: 'The user already exists'})

    //Buscamos el email
    const email = User.findOne({email: req.body.email})
    
    // Si el email existe enviamos un mensaje de que existe
    if(email) return res.status(400).json({message: 'The email already exists'})

    next()
}


// Funcion para ver si el rol existe
export const checkRoleExists = (req, res, next) => {
    //Verificamos si el arreglo de roles existe
    if(req.body.roles) {
        // Si existe recorro el arreglo de roles
        for (let i = 0; i < req.body.roles.length; i++) {
            // Si los roles no existen en el arreglo que estamos recorriendo
            if(!ROLES.includes(req.body.roles[i])) {
                // Enviamos un mensaje de error
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`
                })
            }
        }
    }

    // Si los roles existen entonces continua 
    next()
}