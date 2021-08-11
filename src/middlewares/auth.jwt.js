import jwt from 'jsonwebtoken'
import config from '../config'
import User from '../models/User'
import Role from '../models/Role'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]

        console.log(token)
    
        // Si el token no existe retorna un mensaje de error
        if(!token) return res.status(404).json({ message: 'No token provided'})
    
        // Si el token existe entonces extraigo lo que trae el token
        const decoded = jwt.verify(token, config.SECRET)
    
        req.userId = decoded.id
    
        //Comprobamos si el usuario existe => Sacamos el id desde la token
        const user = await User.findById(req.userId, {password: 0})
    
        // Si no encontramos el usuario enviamos un mensaje de error
        if(!user) return res.status(404).json({message: 'User not found'})
    
        next()
    } catch (error) {
        return res.status(401).json({ message: 'You don´t have permission to do this'})
    }
}

export const isModerator = async(req, res, next) => {
    // Buscamos el usuario por id
    const user = await User.findById(req.userId)
    // Buscamos el rol que posee el usuario 
    const roles = await Role.find({_id: {$in: user.roles}})

    // Recorremos el arreglo de roles, si es igual a moderador continua, si no regresa
    for(let i = 0; i < roles.length; i++) {
        if(roles[i].name === "moderator") {
            next()
            return;
        }
    }

    return res.status(403).json({ message: "Moderator Role is required"})
    
    next()
}

export const isAdmin = async(req, res, next) => {
       // Buscamos el usuario por id
       const user = await User.findById(req.userId)
       // Buscamos el rol que posee el usuario 
       const roles = await Role.find({_id: {$in: user.roles}})
   
       // Recorremos el arreglo de roles, si es igual a moderador continua, si no regresa
       for(let i = 0; i < roles.length; i++) {
           if(roles[i].name === "admin") {
               next()
               return;
           }
       }
   
       return res.status(403).json({ message: "Admin Role is required"})
       
       next()
}