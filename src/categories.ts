import { Request, Response } from "express"
import fs from "fs"

type Category = {
    id: number,
    name: string
}

let ids: number = 1
let categories: Category[] = []

export function createCategory(req: Request, res: Response){
    const category: Category = {
        id: ids++,
        name: req.body.name
    }

    categories.push(category)

    res.status(201).json({
        message: "Category created"
    })
}

export function readCategory(req: Request, res: Response){
    res.status(200).json(categories)
}

export function updateCategory(req: Request, res: Response){
    const id = +req.params.id 
    const name = req.body.name
    const index = categories.findIndex(category => category.id == id)
    categories[index] = {
        id,
        name
    }
    res.status(200).json({
        message: "Category" + id + " updated."
    })
}

export function deleteCategory(req: Request, res: Response){
    const id:number = +req.params.id
    categories = categories.filter(category => category.id != id)

    res.status(200).json({
        message: "Category " + id + " deleted."
    })
}