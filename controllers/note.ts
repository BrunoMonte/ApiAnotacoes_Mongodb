import { Request, Response } from 'express'
import * as note from '../services/note'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const { _id: userId } = req.user
        const {page, perPage } = req.query
        const notes = await note.list(userId, Number(page),Number(perPage))

        return res.json(notes)
    } catch (err: any) {
        return error(res, err)
    }
}

const get = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        const { _id: userId} = req.user
        if(!id) return res.status(400).json({ message: 'Informe o campo id!' })    

        const noteFound = await note.get(userId,id)
        res.json(noteFound)
    } catch (err: any) {
        return error(res, err)
    }

}

const create = async (req: Request<any>, res: Response<any>) => {
    try {
        const title = req.body.title
        const description = req.body.description
        const { _id: userId } = req.user
        const noteCreated = await note.create({ title, description }, userId)
        return res.json(noteCreated)
    } catch (err: any) {
        return error(res, err)
    }

  
}

const update = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id
        const title = req.body.title
        const description = req.body.description
        const { _id: userId } = req.user
        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const noteUpdated = await note.update({ id, title, description }, userId)
        return res.json(noteUpdated)
    } catch (err: any) {
        return error(res, err)
    }

}

const remove = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.body.id
        const {_id: userId} = req.user
        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        await note.remove(userId,id)
        res.json({ success: true })

    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list,
    get, 
    create,
    update, 
    remove
}