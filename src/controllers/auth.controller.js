import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role'

// Sign Up
export const signUp = async (req, res) => {
    // Traemos los parametros desde req.body
    const { username, email, password, roles} = req.body
    
    //Creamos un nuevo usuario, le pasamos el username, email y la password encriptada
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    //Verificamos si nos envían los roles
    if(roles) {
        // De todos los roles que tengo guardados en mi base de datos,busco el que me envía el usuario. 
        const foundRoles = await Role.find({name: {$in: roles}})
        // Guardamos un arreglo con los id
        newUser.roles = foundRoles.map(role => role._id)
    } else {
        // Si el usuario no coloca un rol, entonces le colocamos por defecto el rol user
        const role = await Role.findOne({name: "user"})
        // Guardamos el rol con el id 
        newUser.roles = [role._id]
    }
    
    //Guardamos el nuevo usuario en la base de datos
    const savedUser = await newUser.save()

    console.log(savedUser)

    //Creamos el token del usuario
    const token = jwt.sign({id: savedUser._id}, 'config.SECRET', {
        expiresIn: 86400 // 24 hrs
    })
    res.status(200).json({token})
}

// Sign In
export const signIn = async (req, res) => {

    // Buscamos el usuario en la db
    const userFound = await User.findOne({email: req.body.email}).populate("roles")

    // Si no encuentra el usuario envía un msj de error
    if(!userFound) return res.status(400).json({message: "User not found"})

    // Match Password const
    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    //Si las contraseñas no coinciden envía un mensaje de error
    if(!matchPassword) return res.status(401).json({ token: null, message: 'Invalid password'})

    // Si las contraseñas coinciden, entonces entra
    const token = jwt.sign({ id: userFound._id}, config.SECRET, {
        expiresIn: 86400 // 24 hrs
    })

    // Le enviamos el token
    res.json({token})
}

