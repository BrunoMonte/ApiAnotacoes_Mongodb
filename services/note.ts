import { INote } from "../types/INote"
import { connect } from '../libs/mongodb'
import { Note } from '../models/noteModel'
import { Log } from '../models/logModel'


const list = async (userId?: string, page = 1, perPage = 50) => {
    await connect()
    const maxPages = Math.min(perPage, 100)
    const skip = (page - 1) * maxPages
    const result = await Note.find({user: userId }).skip(skip).limit(maxPages)
    await Log.create({ user: userId , description: 'Listagem de anotações !' })
    return result
}

const get = async (userId?: string, id?: string) => {
    if (!id) {
      throw new Error("Informe o campo id!")
    }
    await connect()
    const note = await Note.findById(id)
  
    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }
    await Log.create({ user: userId , description: 'Obter anotações !' })

    return note
}

const create = async (note: INote, userId?: string ) => {
    if (!note.title) {
        throw new Error("Informe o campo title!")
    }
  
    if (!note.description) {
        throw new Error("Informe o campo description!")
    }

    note.user = userId
    await connect()
    await Note.create(note)
    await Log.create({ user: userId , description: 'Criação de anotações !' })
    return true
  
}

const update = async (note: INote, userId?: string) => {
    if (!note.id) {
        throw new Error("Informe o campo id!")
    }

    if (!note.title) {
        throw new Error("Informe o campo title!")
    }
  
    if (!note.description) {
        throw new Error("Informe o campo description!")
    }
  
    const noteFound = await Note.findByIdAndUpdate(note.id, note)
  
    if (!noteFound) {
      throw new Error("Nenhuma anotação encontrada para o id informado!")
    }
    await Log.create({ user: userId , description: 'Alteração de anotações !' })
    return true
}

const remove = async (userId?: string, id?: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }
  
    const note = await Note.findByIdAndRemove(id)
    if (!note) {
        throw new Error("Nenhuma anotação encontrada para o id informado!")
    }
    await Log.create({ user: userId , description: 'Excluindo anotações !' })
    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
