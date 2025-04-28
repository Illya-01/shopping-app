import { Schema, model } from 'mongoose'

const commentSchema = new Schema({
  id: Number,
  productId: Number,
  description: String,
  date: String,
})

const productSchema = new Schema({
  name: String,
  count: Number,
  size: {
    width: Number,
    height: Number,
  },
  weight: String,
  imageUrl: String,
  comments: [commentSchema],
})

const Product = model('Product', productSchema)

export default Product
