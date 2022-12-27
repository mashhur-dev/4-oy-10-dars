import express from "express"
import cors from "cors"
import { createCategory, readCategory, updateCategory, deleteCategory } from "./categories"
import { createProducts, deleteProducts, readProducts, loadProducts } from "./products"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/categories', createCategory)
app.get('/categories', readCategory)
app.put('/categories/:id', updateCategory)
app.delete('/categories/:id', deleteCategory)

app.post('/products', createProducts)
app.get('/products', readProducts)
app.delete('/products', deleteProducts)

app.listen(8080, () => {
    console.log('Server ushbu port orqali ishladi http://127.0.0.1:8080')    
})