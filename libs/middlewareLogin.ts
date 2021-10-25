import { NextFunction, Request, Response } from "express";
import * as user from '../services/user'
import { IUser } from "../types/IUser";
import { verify } from 'jsonwebtoken'

declare global {
    namespace Express{
        interface Request{
            user: IUser
        }
    }
}

const isLogged = async (req: Request<any>, res: Response<any>, next: NextFunction) => {
    
    if(!req.headers.token){
        return res.status(401).json ({ message: "Você não está logado !"})
    }

    try {
        const payload = verify(req.headers.token?.toString(), process.env.JWT_SECRET ?? 'emptjwt') as any

    req.user = payload

    next()
    } catch (error) {
        return res.status(401).json ({ message: error})
    }

    

}

export {
    isLogged
}