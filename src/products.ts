import { Request, Response } from "express"
import fs from 'fs'

type Product = {
    id: number
    model: string
    description: string
    price: number

    catId: number
}

type State = {
    ids: number
    products: Product[]
}

let ids: number = 1
let products: Product[] = []


export function createProducts(req: Request, res: Response) {
    const product: Product = {
        id: ids++,
        model: req.body.model,
        description: req.body.description,
        price: req.body.price,
        catId: req.body.catId
    }

    products.push(product)

    res.status(200).json({
        message: "Product created",
        products
    })

    saveProducts()
}

export function readProducts(req: Request, res: Response) {
    
    let catId = req.query.category

    if(catId == undefined) {
        res.status(200).json({
            message: "all products",
            products
        })
    }
    else{
        res.status(200).json({
            message: "All products",
            products: products.filter(product => product.catId == Number(catId))
        })
    }
}

export function deleteProducts(req: Request, res: Response) {
    const id: number = +req.params.id
    products = products.filter(product => product.id == id)
    res.status(200).json({
        message: "Product deleted"
    }
    )

    saveProducts()
}

export function saveProducts() {
    const state: State = {
        ids,
        products
    }

    const json: string = JSON.stringify(state)

    fs.writeFileSync('./products.json', json)
}

export function loadProducts() {
    if(fs.existsSync('./products.json')) {
        const json: string = fs.readFileSync('./products.json', 'utf-8')
        const state: State = JSON.parse(json)

        ids = state.ids
        products = state.products
    }
    else{
        saveProducts()
    }
}