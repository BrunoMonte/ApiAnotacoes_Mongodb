import { IUser } from "../types/IUser"
import { connect } from '../libs/mongodb'
import { User } from '../models/userModel'
import { sign } from 'jsonwebtoken'
import { Log } from '../models/logModel'

const login = async (user: IUser) => {
    if (!user.email) {
        throw new Error("Informe o campo email !")
    }
  
    if (!user.password) {
        throw new Error("Informe o campo senha !")
    }

    await connect()
    const userLogged = await User.findOne({ email: user.email, password: user.password })

    if(!userLogged){
        throw new Error ("Email ou senha não confere !")
    }

    const token = sign({
        _id: userLogged._id,
        name: userLogged.name,
        email: userLogged.email
    }, process.env.JWT_SECRET ?? 'emptyjwt', {})

    return { token }
  
}
const getByid = async (_id: string) => {
    
    await connect()
    return User.findById(_id)
  
}

const listLog = async (userId?: string, page = 1, perPage = 50) => {
    await connect()
    const maxPages = Math.min(perPage, 100)
    const skip = (page - 1) * maxPages
    const result = await Log.find().populate('user', 'name').skip(skip).limit(maxPages)
    await Log.create({ user: userId , description: 'Listagem de Logs !' })
    return result
}


export {
    login,
    getByid,
    listLog
}
