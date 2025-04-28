import express, { json } from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import Product from './models/Product.js'

const app = express()

app.use(json())
app.use(cors())

try {
  await connect(`mongodb://127.0.0.1:27017/shopping-app`)
} catch (error) {
  console.error('Error connecting to MongoDB:', error.message)
  process.exit(1)
}

app.get('/products', async (req, res) => {
  try {
    const { sortBy = 'name' } = req.query
    const products = await Product.find().sort({ [sortBy]: 1, count: 1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.status(201).json(newProduct)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.put('/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    )
    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id)
    res.json({ message: 'Product removed successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
})

app.post('/products/:id/comments', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const newComment = {
      ...req.body,
      productId: req.params.id,
    }

    product.comments.push(newComment)
    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } catch (error) {
    console.error('Error adding comment:', error.message)
    res.status(500).json({ error: 'Server error' })
  }
})

app.listen(8000, () => {
  console.log('The server is running on https://localhost:8000')
})
