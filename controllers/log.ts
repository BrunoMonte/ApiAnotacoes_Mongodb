import { Request, Response } from 'express'
import * as user from '../services/user'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const { _id: userId } = req.user
        const {page, perPage } = req.query
        const notes = await user.listLog(userId, Number(page),Number(perPage))

        return res.json(notes)
    } catch (err: any) {
        return error(res, err)
    }
}


export {
    list
}